# Layla Help

Static documentation for `help.layla-network.ai`, built with Astro, Markdown content collections, React islands, and Pagefind.

## Commands

```sh
npm run dev      # Start the Astro development server
npm run check    # Validate Astro and TypeScript files
npm run build    # Check, build static HTML, and generate the Pagefind index
npm run preview  # Preview the most recent build
```

Search is generated from the static HTML during `npm run build`. It is therefore available in the production build and preview, but not from a fresh `npm run dev` session.

## Validating the legacy article migration

Run `npm run validate:migration`. The command exits successfully only when all
articles in `scripts/article-migration-manifest.json` have a complete media
inventory, a first-level Markdown file, valid source metadata, substantive
content, and locally stored media referenced from the article.

## Adding an article

Create a Markdown or MDX file under `src/content/docs/`. The folder and filename determine the public URL. For example:

```text
src/content/docs/local-models/importing.md
→ /local-models/importing/
```

Every article must include validated frontmatter:

```yaml
---
title: Importing a local model
description: Add a compatible local model to Layla.
category: Models
order: 20
keywords:
  - GGUF
draft: false
---
```

## Deployment

Use `npm run build` as the Cloudflare Pages build command and `dist` as the output directory. The project is fully static and does not require a Cloudflare runtime adapter.
