import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import { parseDocument } from "yaml";

import { defaultLocale, localeMetadata, locales } from "../src/lib/i18n.ts";

const repositoryRoot = process.cwd();
const docsRoot = path.join(repositoryRoot, "src", "content", "docs");
const articlePattern = /(?:^|\/)index\.mdx?$/i;
const localeSources = ["astro.config.mjs", "src/lib/i18n.ts"];
const reportSources = [
  ...localeSources,
  ".github/workflows/translation-status.yml",
  "scripts/report-translations.mjs",
];

function relativePath(filePath) {
  return path.relative(repositoryRoot, filePath).replaceAll(path.sep, "/");
}

function parseArguments(arguments_) {
  const options = { base: undefined };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];

    if (argument === "--base") {
      options.base = arguments_[index + 1];
      index += 1;
      if (!options.base)
        throw new Error("--base requires a Git commit SHA or ref.");
    } else if (argument.startsWith("--base=")) {
      options.base = argument.slice("--base=".length);
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  return options;
}

function findAllArticles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findAllArticles(entryPath);
    return articlePattern.test(relativePath(entryPath)) ? [entryPath] : [];
  });
}

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, "utf8").replaceAll("\r\n", "\n");

  if (!content.startsWith("---\n")) {
    throw new Error(
      `${relativePath(filePath)} must begin with YAML frontmatter.`,
    );
  }

  const closingIndex = content.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error(
      `${relativePath(filePath)} has no closing YAML frontmatter marker.`,
    );
  }

  const document = parseDocument(content.slice(4, closingIndex), {
    prettyErrors: true,
    uniqueKeys: true,
  });

  if (document.errors.length > 0) {
    throw new Error(
      `Could not read frontmatter from ${relativePath(filePath)}: ${document.errors[0].message}`,
    );
  }

  const data = document.toJS();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${relativePath(filePath)} frontmatter must be an object.`);
  }

  return data;
}

function describeArticle(filePath) {
  const relativeToDocs = path
    .relative(docsRoot, filePath)
    .replaceAll(path.sep, "/");
  const segments = relativeToDocs.split("/");
  const firstSegment = segments[0];
  const locale =
    firstSegment !== defaultLocale && locales.includes(firstSegment)
      ? firstSegment
      : defaultLocale;
  const slugSegments = locale === defaultLocale ? segments : segments.slice(1);
  const slug = slugSegments.slice(0, -1).join("/");
  const data = parseFrontmatter(filePath);

  return {
    data,
    filePath,
    key: data.translationKey ?? slug,
    locale,
    relativePath: relativePath(filePath),
    slug,
  };
}

function indexArticles(articles) {
  const byLocale = new Map(locales.map((locale) => [locale, new Map()]));

  for (const article of articles) {
    const localeArticles = byLocale.get(article.locale);
    const existing = localeArticles.get(article.key);

    if (existing) {
      throw new Error(
        `Duplicate translation key \`${article.key}\` for ${existing.relativePath} and ${article.relativePath}.`,
      );
    }

    localeArticles.set(article.key, article);
  }

  return byLocale;
}

function gitOutput(arguments_) {
  return execFileSync("git", arguments_, {
    cwd: repositoryRoot,
    encoding: "utf8",
  }).trim();
}

function lastCommit(article) {
  const output = gitOutput([
    "log",
    "-1",
    "--format=%cI%x00%h",
    "--",
    article.relativePath,
  ]);

  if (!output) return undefined;

  const [committedAt, shortHash] = output.split("\0");
  const timestamp = Date.parse(committedAt);
  if (!Number.isFinite(timestamp)) {
    throw new Error(
      `Git returned an invalid commit date for ${article.relativePath}.`,
    );
  }

  return { committedAt, shortHash, timestamp };
}

function changedFiles(base) {
  const output = execFileSync(
    "git",
    [
      "diff",
      "--name-only",
      "--diff-filter=ACMR",
      "-z",
      `${base}...HEAD`,
      "--",
      "src/content/docs",
      ...reportSources,
    ],
    { cwd: repositoryRoot, encoding: "utf8" },
  );

  return output.split("\0").filter(Boolean);
}

function selectEnglishArticles(articlesByLocale, base) {
  const englishArticles = [...articlesByLocale.get(defaultLocale).values()]
    .filter((article) => article.data.draft !== true)
    .sort((left, right) => left.relativePath.localeCompare(right.relativePath));

  if (!base) return englishArticles;

  const changed = changedFiles(base);
  if (changed.some((filePath) => reportSources.includes(filePath))) {
    return englishArticles;
  }

  const changedPaths = new Set(changed);
  return englishArticles.filter((article) =>
    changedPaths.has(article.relativePath),
  );
}

function collectIssues(englishArticles, articlesByLocale) {
  const issues = [];

  for (const englishArticle of englishArticles) {
    const englishCommit = lastCommit(englishArticle);

    for (const locale of locales) {
      if (locale === defaultLocale) continue;

      const translation = articlesByLocale.get(locale).get(englishArticle.key);
      if (!translation) {
        issues.push({
          englishArticle,
          englishCommit,
          locale,
          status: "missing",
        });
        continue;
      }

      const translationCommit = lastCommit(translation);
      if (
        !englishCommit ||
        !translationCommit ||
        englishCommit.timestamp > translationCommit.timestamp
      ) {
        issues.push({
          englishArticle,
          englishCommit,
          locale,
          status: "outdated",
          translation,
          translationCommit,
        });
      }
    }
  }

  return issues;
}

function localeName(locale) {
  return localeMetadata[locale]?.name ?? locale;
}

function formatCommit(commit) {
  return commit ? `${commit.committedAt} (${commit.shortHash})` : "uncommitted";
}

function commandMessage(value) {
  return value
    .replaceAll("%", "%25")
    .replaceAll("\r", "%0D")
    .replaceAll("\n", "%0A");
}

function commandProperty(value) {
  return commandMessage(value).replaceAll(":", "%3A").replaceAll(",", "%2C");
}

function printIssue(issue) {
  const language = localeName(issue.locale);
  let message;
  let annotationFile;

  if (issue.status === "missing") {
    annotationFile = issue.englishArticle.relativePath;
    message = `${language} translation is missing. English was last committed ${formatCommit(issue.englishCommit)}.`;
  } else {
    annotationFile = issue.translation.relativePath;
    message = `${language} translation is outdated. English: ${formatCommit(issue.englishCommit)}; translation: ${formatCommit(issue.translationCommit)}.`;
  }

  console.log(
    `[${issue.locale}] ${issue.status.toUpperCase()} ${issue.englishArticle.relativePath} - ${message}`,
  );

  if (process.env.GITHUB_ACTIONS === "true") {
    console.log(
      `::warning file=${commandProperty(annotationFile)}::${commandMessage(message)}`,
    );
  }
}

function summaryMarkdown(issues, articleCount, base) {
  const scope = base
    ? `English articles changed since \`${base}\``
    : "all published English articles";
  const lines = ["## Translation status", "", `Scope: ${scope}.`, ""];

  if (articleCount === 0) {
    lines.push("No English articles were affected by this change.", "");
    return lines.join("\n");
  }

  if (issues.length === 0) {
    lines.push(
      `All translations are current for the ${articleCount} English article${articleCount === 1 ? "" : "s"} checked.`,
      "",
    );
    return lines.join("\n");
  }

  lines.push(
    `${issues.length} translation${issues.length === 1 ? "" : "s"} need attention across ${articleCount} English article${articleCount === 1 ? "" : "s"} checked. This report is informational and does not block merging.`,
    "",
    "| Language | Status | English article | English commit | Translation commit |",
    "| --- | --- | --- | --- | --- |",
  );

  for (const issue of issues) {
    lines.push(
      `| ${localeName(issue.locale)} | ${issue.status} | \`${issue.englishArticle.relativePath}\` | ${formatCommit(issue.englishCommit)} | ${issue.translationCommit ? formatCommit(issue.translationCommit) : "—"} |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}

function main() {
  const options = parseArguments(process.argv.slice(2));

  if (!existsSync(docsRoot)) {
    throw new Error(
      `Article directory does not exist: ${relativePath(docsRoot)}`,
    );
  }

  const articles = findAllArticles(docsRoot).map(describeArticle);
  const articlesByLocale = indexArticles(articles);
  const englishArticles = selectEnglishArticles(articlesByLocale, options.base);
  const issues = collectIssues(englishArticles, articlesByLocale);

  if (issues.length === 0) {
    console.log(
      englishArticles.length === 0
        ? "No English articles were affected by this change."
        : `All translations are current for ${englishArticles.length} English article${englishArticles.length === 1 ? "" : "s"}.`,
    );
  } else {
    issues.forEach(printIssue);
    console.log(
      `\n${issues.length} translation${issues.length === 1 ? "" : "s"} need attention. This report is informational.`,
    );
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      summaryMarkdown(issues, englishArticles.length, options.base),
    );
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
