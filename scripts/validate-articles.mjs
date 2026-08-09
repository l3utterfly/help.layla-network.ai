import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import * as prettier from "prettier";
import { parseDocument } from "yaml";

const repositoryRoot = process.cwd();
const docsRoot = path.join(repositoryRoot, "src", "content", "docs");
const topicSource = path.join(repositoryRoot, "src", "lib", "docs.ts");
const articlePattern = /(?:^|\/)index\.mdx?$/i;

function relativePath(filePath) {
  return path.relative(repositoryRoot, filePath).replaceAll(path.sep, "/");
}

function parseArguments(arguments_) {
  const options = { base: undefined, files: [] };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];

    if (argument === "--base") {
      options.base = arguments_[index + 1];
      index += 1;
      if (!options.base)
        throw new Error("--base requires a Git commit SHA or ref.");
    } else if (argument.startsWith("--base=")) {
      options.base = argument.slice("--base=".length);
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      options.files.push(argument);
    }
  }

  if (options.base && options.files.length > 0) {
    throw new Error("Pass either --base or article paths, not both.");
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

function findAddedArticles(base) {
  const output = execFileSync(
    "git",
    [
      "diff",
      "--name-only",
      "--diff-filter=ACR",
      "-z",
      `${base}...HEAD`,
      "--",
      "src/content/docs",
    ],
    { cwd: repositoryRoot, encoding: "utf8" },
  );

  return output
    .split("\0")
    .filter((filePath) => articlePattern.test(filePath))
    .map((filePath) => path.resolve(repositoryRoot, filePath));
}

function getRegisteredCategories() {
  const source = readFileSync(topicSource, "utf8");
  const topicsStart = source.indexOf("export const topics");
  const topicsEnd = source.indexOf("\n]", topicsStart);

  if (topicsStart === -1 || topicsEnd === -1) {
    throw new Error(
      `Could not find the topics array in ${relativePath(topicSource)}.`,
    );
  }

  const categories = new Set();
  const categoryPattern = /category:\s*(['"])(.*?)\1/g;
  const topicsBlock = source.slice(topicsStart, topicsEnd);

  for (const match of topicsBlock.matchAll(categoryPattern))
    categories.add(match[2]);

  if (categories.size === 0) {
    throw new Error(
      `No topic categories were found in ${relativePath(topicSource)}.`,
    );
  }

  return categories;
}

function parseFrontmatter(content, filePath) {
  const normalized = content.replaceAll("\r\n", "\n");

  if (!normalized.startsWith("---\n")) {
    return {
      errors: [
        {
          line: 1,
          message: "Article must begin with YAML frontmatter (`---`).",
        },
      ],
    };
  }

  const closingIndex = normalized.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    return {
      errors: [
        { line: 1, message: "Frontmatter must end with a closing `---` line." },
      ],
    };
  }

  const frontmatter = normalized.slice(4, closingIndex);
  const body = normalized.slice(closingIndex + 5);
  const document = parseDocument(frontmatter, {
    prettyErrors: true,
    uniqueKeys: true,
  });

  if (document.errors.length > 0) {
    return {
      errors: document.errors.map((error) => ({
        line: error.linePos?.[0]?.line ?? 2,
        message: `Invalid YAML frontmatter: ${error.message}`,
      })),
    };
  }

  const data = document.toJS();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      errors: [{ line: 2, message: "Frontmatter must be a YAML object." }],
    };
  }

  return { data, body, errors: [], filePath };
}

function validateFrontmatter(parsed, categories) {
  if (parsed.errors.length > 0) return parsed.errors;

  const { data, body } = parsed;
  const errors = [];

  for (const field of ["title", "description", "category"]) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      errors.push({
        line: 2,
        message: `Frontmatter field \`${field}\` must be a non-empty string.`,
      });
    }
  }

  if (!Number.isInteger(data.order)) {
    errors.push({
      line: 2,
      message: "Frontmatter field `order` must be an integer.",
    });
  }

  if (
    !Array.isArray(data.keywords) ||
    data.keywords.some((keyword) => typeof keyword !== "string")
  ) {
    errors.push({
      line: 2,
      message: "Frontmatter field `keywords` must be an array of strings.",
    });
  }

  if ("draft" in data && typeof data.draft !== "boolean") {
    errors.push({
      line: 2,
      message: "Optional frontmatter field `draft` must be a boolean.",
    });
  }

  if (
    "lastUpdated" in data &&
    (typeof data.lastUpdated !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.lastUpdated))
  ) {
    errors.push({
      line: 2,
      message: "Optional frontmatter field `lastUpdated` must use YYYY-MM-DD.",
    });
  }

  if (typeof data.category === "string" && !categories.has(data.category)) {
    errors.push({
      line: 2,
      message: `Unknown category \`${data.category}\`. Add it to the topics array or use an existing category.`,
    });
  }

  if (body.trim() === "") {
    errors.push({ line: 2, message: "Article body must not be empty." });
  }

  return errors;
}

function removeCode(content) {
  const lines = content.split("\n");
  let fence;

  const withoutFences = lines
    .map((line) => {
      const marker = line.trimStart().match(/^(`{3,}|~{3,})/);

      if (marker && !fence) {
        fence = marker[1];
        return " ".repeat(line.length);
      }

      if (
        marker &&
        fence &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length
      ) {
        fence = undefined;
        return " ".repeat(line.length);
      }

      return fence ? " ".repeat(line.length) : line;
    })
    .join("\n");

  return withoutFences.replace(/(`+)(?:[^`]|`(?!\1))*\1/g, (match) =>
    match.replace(/[^\n]/g, " "),
  );
}

function lineAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

function extractLocalReferences(content) {
  const searchable = removeCode(content);
  const references = [];

  const addMatches = (pattern, kind, targetGroups = [1, 2]) => {
    for (const match of searchable.matchAll(pattern)) {
      const target = targetGroups.map((group) => match[group]).find(Boolean);
      if (target)
        references.push({
          target,
          kind,
          line: lineAt(searchable, match.index),
        });
    }
  };

  addMatches(
    /!?\[[^\]\n]*\]\(\s*(?:<([^>\n]+)>|((?:\\.|[^\s)])+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g,
    "markdown",
  );
  addMatches(/^[ \t]{0,3}\[[^\]\n]+\]:\s*(?:<([^>\n]+)>|(\S+))/gm, "markdown");
  addMatches(
    /\b(?:import|export)\s+(?:[^'"\n]+\s+from\s+)?['"]([^'"]+)['"]/g,
    "asset",
    [1],
  );
  addMatches(
    /\burl\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/gi,
    "asset",
    [1, 2, 3],
  );

  for (const tag of searchable.matchAll(
    /<(?:a|audio|img|object|source|track|video)\b[^>]*>/gi,
  )) {
    const attributePattern =
      /\b(?:data|href|poster|src)\s*=\s*(?:"([^"]+)"|'([^']+)'|\{?['"]([^'"]+)['"]\}?)/gi;
    for (const attribute of tag[0].matchAll(attributePattern)) {
      const target = attribute[1] ?? attribute[2] ?? attribute[3];
      references.push({
        target,
        kind: "asset",
        line: lineAt(searchable, tag.index + attribute.index),
      });
    }
  }

  return references.filter(
    ({ target }) =>
      target.startsWith("./") ||
      target.startsWith("../") ||
      target.startsWith("/assets/articles/"),
  );
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

function hasExactCase(filePath) {
  if (!isInside(repositoryRoot, filePath)) return false;

  const segments = path
    .relative(repositoryRoot, filePath)
    .split(path.sep)
    .filter(Boolean);
  let current = repositoryRoot;

  for (const segment of segments) {
    if (!readdirSync(current).includes(segment)) return false;
    current = path.join(current, segment);
  }

  return true;
}

function resolveReference(articlePath, target) {
  const pathOnly = target.split(/[?#]/, 1)[0];
  let decoded;

  try {
    decoded = decodeURIComponent(pathOnly);
  } catch {
    return { error: `Asset path is not valid URL encoding: ${target}` };
  }

  const resolved = decoded.startsWith("/assets/articles/")
    ? path.resolve(docsRoot, decoded.slice("/assets/articles/".length))
    : path.resolve(path.dirname(articlePath), decoded);

  if (!isInside(repositoryRoot, resolved)) {
    return { error: `Local reference escapes the repository: ${target}` };
  }

  return { resolved };
}

function validateReferences(articlePath, content) {
  const errors = [];

  for (const reference of extractLocalReferences(content)) {
    const { resolved, error } = resolveReference(articlePath, reference.target);
    if (error) {
      errors.push({ line: reference.line, message: error });
      continue;
    }

    if (!existsSync(resolved)) {
      errors.push({
        line: reference.line,
        message: `Local asset does not exist: ${reference.target}`,
      });
      continue;
    }

    if (!hasExactCase(resolved)) {
      errors.push({
        line: reference.line,
        message: `Local asset path has incorrect letter case: ${reference.target}`,
      });
      continue;
    }

    if (reference.kind === "asset" && !statSync(resolved).isFile()) {
      errors.push({
        line: reference.line,
        message: `Local asset is not a file: ${reference.target}`,
      });
    }
  }

  return errors;
}

async function validateArticle(articlePath, categories) {
  const errors = [];
  const articleRelativePath = relativePath(articlePath);

  if (!articlePattern.test(articleRelativePath)) {
    return [
      {
        line: 1,
        message: "Article entry must be named index.md or index.mdx.",
      },
    ];
  }

  if (!existsSync(articlePath)) {
    return [{ line: 1, message: "Article file does not exist." }];
  }

  const content = readFileSync(articlePath, "utf8");

  try {
    if (!(await prettier.check(content, { filepath: articlePath }))) {
      errors.push({
        line: 1,
        message:
          "Article is not formatted. Run `npx prettier --write <article>`.",
      });
    }
  } catch (error) {
    errors.push({
      line: 1,
      message: `Markdown could not be parsed by Prettier: ${error.message}`,
    });
  }

  const parsed = parseFrontmatter(content, articlePath);
  errors.push(...validateFrontmatter(parsed, categories));
  errors.push(...validateReferences(articlePath, content));

  return errors;
}

function printError(filePath, error) {
  const file = relativePath(filePath);
  console.error(`${file}:${error.line}: ${error.message}`);

  if (process.env.GITHUB_ACTIONS === "true") {
    const message = error.message
      .replaceAll("%", "%25")
      .replaceAll("\r", "%0D")
      .replaceAll("\n", "%0A");
    console.error(`::error file=${file},line=${error.line}::${message}`);
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const categories = getRegisteredCategories();
  let articles;

  if (options.base) {
    articles = findAddedArticles(options.base);
  } else if (options.files.length > 0) {
    articles = options.files.map((filePath) =>
      path.resolve(repositoryRoot, filePath),
    );
  } else {
    articles = findAllArticles(docsRoot);
  }

  articles = [...new Set(articles)].sort();

  if (articles.length === 0) {
    console.log("No newly added articles to validate.");
    return;
  }

  let errorCount = 0;
  for (const articlePath of articles) {
    const errors = await validateArticle(articlePath, categories);
    errorCount += errors.length;
    errors.forEach((error) => printError(articlePath, error));
  }

  if (errorCount > 0) {
    console.error(
      `\nArticle validation failed with ${errorCount} error${errorCount === 1 ? "" : "s"}.`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `Validated ${articles.length} article${articles.length === 1 ? "" : "s"} successfully.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
