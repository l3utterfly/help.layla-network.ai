# Layla Help

Static documentation for `help.layla-network.ai`, built with Astro, Markdown content collections, React islands, and Pagefind.

## Commands

```sh
npm run dev      # Start the Astro development server
npm run check    # Validate Astro and TypeScript files
npm run build    # Check, build static HTML, and generate the Pagefind index
npm run deploy   # Upload the current dist directory to Cloudflare Workers
npm run preview  # Preview the most recent build
```

Search is generated from the static HTML during `npm run build`. It is therefore available in the production build and preview, but not from a fresh `npm run dev` session.

## Adding an article

Create a folder under `src/content/docs/` with an `index.md` or `index.mdx` entry. The folder name determines the public URL. Keep article images, videos, and downloads beside the entry file:

```text
src/content/docs/importing-a-local-model/
├── index.md
├── model-picker.jpg
└── example-agent.json

→ /importing-a-local-model/
```

Reference co-located images with a relative path such as `![Model picker](./model-picker.jpg)`. Astro bundles these images for production. Other article assets remain available from `/assets/articles/<article-folder>/<filename>` so videos and downloadable files work in development and in the static distribution.

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

The project is fully static and does not require a Cloudflare runtime adapter.

For Cloudflare Workers Builds, use:

```text
Build command:  npm run build
Deploy command: npm run deploy
```

The committed `wrangler.jsonc` uploads `dist` as static assets. Do not run Wrangler's automatic Astro setup or add `@astrojs/cloudflare`; that adapter is only needed for server-rendered Astro routes.

For a Cloudflare Pages project, use `npm run build` as the build command and `dist` as the output directory. Pages does not need a separate deploy command.
