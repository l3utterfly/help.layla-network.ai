#!/usr/bin/env python3
"""Validate that every legacy help article and its media were migrated."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlsplit


MIN_BODY_WORDS = 50
EXPECTED_ARTICLE_COUNT = 37
EXPECTED_SCOPE_SHA256 = "da392bdea290fa3bc0a56d4ec600bf58c33a6fd0501b0a5c2c0553b443832d53"
DEFAULT_MANIFEST = "scripts/article-migration-manifest.json"
DOCS_DIRECTORY = "src/content/docs"
ASSETS_DIRECTORY = "public/assets/articles"
MEDIA_EXTENSIONS = {
    ".avif", ".gif", ".jpeg", ".jpg", ".m4v", ".mov", ".mp3", ".mp4",
    ".ogg", ".png", ".svg", ".webm", ".webp", ".wav",
}
PLACEHOLDER_RE = re.compile(r"\b(?:TODO|TBD|PLACEHOLDER|COMING SOON)\b", re.I)
FRONTMATTER_RE = re.compile(r"\A---\s*\n(?P<yaml>.*?)\n---\s*(?:\n|\Z)(?P<body>.*)\Z", re.S)
MARKDOWN_IMAGE_RE = re.compile(r"!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))", re.I)
MARKDOWN_LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))", re.I)
HTML_MEDIA_RE = re.compile(
    r"<(?:img|video|audio|source|iframe)\b[^>]*?\b(?:src|poster)\s*=\s*(?:\"([^\"]+)\"|'([^']+)'|([^\s>]+))",
    re.I,
)
HTML_SRCSET_RE = re.compile(
    r"<(?:img|source)\b[^>]*?\bsrcset\s*=\s*(?:\"([^\"]+)\"|'([^']+)'|([^\s>]+))",
    re.I,
)
CSS_MEDIA_RE = re.compile(r"url\(\s*(?:\"([^\"]+)\"|'([^']+)'|([^\s)]+))", re.I)


@dataclass(frozen=True)
class Problem:
    article: str
    message: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="repository root (defaults to the script's parent repository)",
    )
    parser.add_argument(
        "--manifest",
        type=Path,
        help=f"manifest path (defaults to {DEFAULT_MANIFEST})",
    )
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    return parser.parse_args()


def scalar(frontmatter: str, key: str) -> str | None:
    match = re.search(rf"(?m)^{re.escape(key)}:\s*(.*?)\s*$", frontmatter)
    if not match:
        return None
    value = match.group(1).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        value = value[1:-1]
    return value


def markdown_media_targets(body: str) -> set[str]:
    targets: set[str] = set()
    for pattern in (MARKDOWN_IMAGE_RE, HTML_MEDIA_RE, CSS_MEDIA_RE):
        for match in pattern.finditer(body):
            targets.add(next(value for value in match.groups() if value is not None))

    for match in MARKDOWN_LINK_RE.finditer(body):
        target = next(value for value in match.groups() if value is not None)
        if Path(urlsplit(target).path).suffix.lower() in MEDIA_EXTENSIONS:
            targets.add(target)

    for match in HTML_SRCSET_RE.finditer(body):
        srcset = next(value for value in match.groups() if value is not None)
        for candidate in srcset.split(","):
            target = candidate.strip().split()[0] if candidate.strip() else ""
            if target:
                targets.add(target)
    return targets


def normalize_local_url(target: str) -> str | None:
    target = target.strip()
    parsed = urlsplit(target)
    if parsed.scheme or parsed.netloc or target.startswith("//") or target.startswith("data:"):
        return None
    path = unquote(parsed.path).replace("\\", "/")
    return path if path.startswith("/") else None


def count_words(body: str) -> int:
    body = re.sub(r"```.*?```|~~~.*?~~~", " ", body, flags=re.S)
    body = re.sub(r"<[^>]+>|https?://\S+", " ", body)
    return len(re.findall(r"\b[\w'’-]+\b", body, flags=re.UNICODE))


def validate_manifest(manifest: object) -> tuple[list[dict], list[Problem]]:
    problems: list[Problem] = []
    if not isinstance(manifest, dict) or manifest.get("version") != 1:
        return [], [Problem("manifest", "expected an object with version: 1")]
    articles = manifest.get("articles")
    if not isinstance(articles, list):
        return [], [Problem("manifest", "articles must be a list")]
    if len(articles) != EXPECTED_ARTICLE_COUNT:
        problems.append(
            Problem("manifest", f"expected {EXPECTED_ARTICLE_COUNT} article entries; found {len(articles)}")
        )

    seen_urls: set[str] = set()
    seen_slugs: set[str] = set()
    valid_articles: list[dict] = []
    for index, article in enumerate(articles):
        label = f"manifest article #{index + 1}"
        if not isinstance(article, dict):
            problems.append(Problem(label, "entry must be an object"))
            continue
        source_url = article.get("sourceUrl")
        slug = article.get("slug")
        if not isinstance(source_url, str) or not source_url.startswith("https://blog.layla-network.ai/post/"):
            problems.append(Problem(label, "sourceUrl must be a Layla blog article URL"))
        if not isinstance(slug, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
            problems.append(Problem(label, "slug must contain lowercase letters, numbers, and hyphens only"))
        if not isinstance(source_url, str) or not isinstance(slug, str):
            continue
        if source_url.rstrip("/").rsplit("/", 1)[-1] != slug:
            problems.append(Problem(slug, "slug does not match the source URL"))
        if source_url in seen_urls:
            problems.append(Problem(slug, "duplicate sourceUrl in manifest"))
        if slug in seen_slugs:
            problems.append(Problem(slug, "duplicate slug in manifest"))
        seen_urls.add(source_url)
        seen_slugs.add(slug)
        valid_articles.append(article)

    if len(valid_articles) == EXPECTED_ARTICLE_COUNT:
        scope = "\n".join(
            sorted(f"{article['sourceUrl']}\t{article['slug']}" for article in valid_articles)
        )
        digest = hashlib.sha256(scope.encode("utf-8")).hexdigest()
        if digest != EXPECTED_SCOPE_SHA256:
            problems.append(Problem("manifest", "article URL/slug scope differs from the approved 37-article set"))
    return valid_articles, problems


def validate_article(root: Path, article: dict) -> list[Problem]:
    slug = article["slug"]
    source_url = article["sourceUrl"]
    problems: list[Problem] = []
    candidates = [root / DOCS_DIRECTORY / f"{slug}{suffix}" for suffix in (".md", ".mdx")]
    existing = [path for path in candidates if path.is_file()]
    if not existing:
        return [Problem(slug, f"missing {DOCS_DIRECTORY}/{slug}.md (or .mdx)")]
    if len(existing) > 1:
        return [Problem(slug, "both .md and .mdx files exist; keep exactly one")]

    doc_path = existing[0]
    text = doc_path.read_text(encoding="utf-8-sig")
    match = FRONTMATTER_RE.match(text)
    if not match:
        return [Problem(slug, "missing or malformed YAML frontmatter")]
    frontmatter, body = match.group("yaml"), match.group("body")

    for key in ("title", "description", "category"):
        value = scalar(frontmatter, key)
        if not value:
            problems.append(Problem(slug, f"frontmatter field {key} is missing or empty"))
        elif PLACEHOLDER_RE.search(value):
            problems.append(Problem(slug, f"frontmatter field {key} contains placeholder text"))
    if scalar(frontmatter, "sourceUrl") != source_url:
        problems.append(Problem(slug, "frontmatter sourceUrl does not exactly match the manifest"))
    if scalar(frontmatter, "draft") == "true":
        problems.append(Problem(slug, "article is still marked as a draft"))

    word_count = count_words(body)
    if word_count < MIN_BODY_WORDS:
        problems.append(Problem(slug, f"body has {word_count} words; expected at least {MIN_BODY_WORDS}"))
    if PLACEHOLDER_RE.search(body):
        problems.append(Problem(slug, "body contains placeholder text"))

    inventory_complete = article.get("inventoryComplete")
    media = article.get("media")
    external_media = article.get("externalMedia", [])
    if inventory_complete is not True:
        problems.append(Problem(slug, "media inventory is not marked complete in the manifest"))
    if not isinstance(media, list):
        problems.append(Problem(slug, "manifest media must be a list"))
        media = []
    if not isinstance(external_media, list):
        problems.append(Problem(slug, "manifest externalMedia must be a list"))
        external_media = []

    declared_paths: set[str] = set()
    declared_sources: set[str] = set()
    expected_prefix = f"/assets/articles/{slug}/"
    for index, item in enumerate(media):
        if not isinstance(item, dict):
            problems.append(Problem(slug, f"media item #{index + 1} must be an object"))
            continue
        remote = item.get("sourceUrl")
        local = item.get("localPath")
        if not isinstance(remote, str) or not remote.startswith(("http://", "https://")):
            problems.append(Problem(slug, f"media item #{index + 1} has an invalid sourceUrl"))
        elif remote in declared_sources:
            problems.append(Problem(slug, f"duplicate media sourceUrl: {remote}"))
        else:
            declared_sources.add(remote)
        if not isinstance(local, str) or not local.startswith(expected_prefix):
            problems.append(Problem(slug, f"media item #{index + 1} localPath must start with {expected_prefix}"))
            continue
        if local in declared_paths:
            problems.append(Problem(slug, f"duplicate media localPath: {local}"))
        declared_paths.add(local)
        disk_path = root / "public" / local.lstrip("/")
        if not disk_path.is_file():
            problems.append(Problem(slug, f"declared media file is missing: {local}"))

    declared_external_embeds: set[str] = set()
    for index, item in enumerate(external_media):
        if not isinstance(item, dict):
            problems.append(Problem(slug, f"external media item #{index + 1} must be an object"))
            continue
        remote = item.get("sourceUrl")
        embed = item.get("embedUrl")
        if not isinstance(remote, str) or not remote.startswith(("http://", "https://")):
            problems.append(Problem(slug, f"external media item #{index + 1} has an invalid sourceUrl"))
        if not isinstance(embed, str) or not embed.startswith(("http://", "https://")):
            problems.append(Problem(slug, f"external media item #{index + 1} has an invalid embedUrl"))
            continue
        if embed in declared_external_embeds:
            problems.append(Problem(slug, f"duplicate external media embedUrl: {embed}"))
        declared_external_embeds.add(embed)

    referenced_paths: set[str] = set()
    referenced_external_embeds: set[str] = set()
    for target in markdown_media_targets(body):
        parsed = urlsplit(target)
        if parsed.scheme in ("http", "https") or parsed.netloc or target.startswith("//") or target.startswith("data:"):
            if target in declared_external_embeds:
                referenced_external_embeds.add(target)
            else:
                problems.append(Problem(slug, f"remote or embedded media remains in Markdown: {target}"))
            continue
        local = normalize_local_url(target)
        if local is None:
            problems.append(Problem(slug, f"media path must be site-absolute: {target}"))
            continue
        if not local.startswith(expected_prefix):
            problems.append(Problem(slug, f"media path is outside {expected_prefix}: {local}"))
            continue
        referenced_paths.add(local)
        disk_path = root / "public" / local.lstrip("/")
        if not disk_path.is_file():
            problems.append(Problem(slug, f"referenced media file is missing: {local}"))

    for local in sorted(declared_paths - referenced_paths):
        problems.append(Problem(slug, f"declared media is not referenced by the article: {local}"))
    for local in sorted(referenced_paths - declared_paths):
        problems.append(Problem(slug, f"referenced media is not declared in the manifest: {local}"))
    for embed in sorted(declared_external_embeds - referenced_external_embeds):
        problems.append(Problem(slug, f"declared external media is not embedded by the article: {embed}"))
    return problems


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    manifest_path = (args.manifest or root / DEFAULT_MANIFEST).resolve()
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"Unable to read migration manifest: {error}", file=sys.stderr)
        return 2

    articles, problems = validate_manifest(manifest)
    for article in articles:
        problems.extend(validate_article(root, article))
    problems.sort(key=lambda problem: (problem.article, problem.message))

    result = {
        "ok": not problems,
        "articlesExpected": len(articles),
        "articlesPassed": sum(
            not any(problem.article == article["slug"] for problem in problems)
            for article in articles
        ),
        "problems": [problem.__dict__ for problem in problems],
    }
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        status = "PASS" if result["ok"] else "FAIL"
        print(f"{status}: {result['articlesPassed']}/{result['articlesExpected']} articles complete")
        for problem in problems:
            print(f"- [{problem.article}] {problem.message}")
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
