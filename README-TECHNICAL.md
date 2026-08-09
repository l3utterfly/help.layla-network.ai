# Layla Help technical guide

This guide is for contributors who need to run or change the website itself.
For editing wiki articles, start with the main [contributor README](./README.md).

## Technology overview

Layla Help is a fully static documentation site built with:

- [Astro](https://astro.build/) for pages, layouts, and Markdown content
  collections;
- React islands for interactive components such as search;
- [Pagefind](https://pagefind.app/) for the static search index; and
- Cloudflare Workers static assets for production hosting.

The site does not use server-side rendering and does not require an Astro
Cloudflare adapter.

## Local setup

Use Node.js 24, which matches the version used by continuous integration.

```sh
git clone https://github.com/l3utterfly/help.layla-network.ai.git
cd help.layla-network.ai
npm ci
npm run dev
```

Astro prints the local address after the development server starts. Search is
not available in a fresh development session because Pagefind builds its index
from the final static HTML.

To test the complete production output, run:

```sh
npm run build
npm run preview
```

## Commands

```sh
npm run dev      # Start the Astro development server
npm run check    # Validate Astro content and TypeScript files
npm run lint     # Run Oxlint
npm run build    # Check, build static HTML, and generate the Pagefind index
npm run preview  # Preview the most recent production build
npm run deploy   # Upload the current dist folder (run build first)
```

Validate one new or edited article with:

```sh
npm run validate:articles -- src/content/docs/<article-folder>/index.md
```

Run the article validator without a path to validate every article:

```sh
npm run validate:articles
```

If validation reports a Prettier error, format the article with:

```sh
npx prettier --write src/content/docs/<article-folder>/index.md
```

## Repository structure

```text
src/
├── components/           Shared Astro and React UI components
├── content/docs/         Article Markdown and co-located assets
├── content.config.ts     Article collection and frontmatter schema
├── layouts/              Base page and documentation layouts
├── lib/                  Article routing, topics, ordering, and SEO helpers
├── pages/                Static routes and article asset endpoint
└── styles/               Global styles
scripts/
└── validate-articles.mjs Article-specific validation
public/                   Site-wide static assets
dist/                     Generated production site
```

## Content architecture

The `docs` content collection loads every Markdown or MDX file below
`src/content/docs`. Its schema in `src/content.config.ts` validates `title`,
`description`, `category`, `order`, `keywords`, `lastUpdated`, and `draft`.

Articles conventionally use this layout:

```text
src/content/docs/<article-slug>/index.md
```

`src/lib/docs.ts` removes `/index.md` from the content ID to form the public
slug. It also defines the registered topics, filters out drafts, and sorts
articles first by category, then by `order`, and finally by title.

The catch-all route at `src/pages/[...slug].astro` renders each published entry
through `DocsLayout.astro`. The layout supplies the article title and
description, breadcrumbs, metadata, table of contents, previous/next links, and
the GitHub edit link. Markdown bodies should therefore start at heading level
two rather than repeat the title as an `h1`.

## Article assets

Raster images can be referenced relatively from Markdown:

```md
![Alternative text](./image.jpg)
```

Astro imports and optimizes these content images. The first Markdown image is
also used by `src/lib/articleSeo.ts` as the article's social preview image.

Raw `.mp4` and `.json` files are published by
`src/pages/assets/articles/[...path].ts` at their corresponding
`/assets/articles/...` URL. This keeps video and downloadable article files
co-located with their Markdown source:

```html
<video
  controls
  playsinline
  src="/assets/articles/<article-slug>/demo.mp4"
></video>
```

```md
[Download the example](/assets/articles/<article-slug>/example.json)
```

Add another extension to `publishedAssetExtensions` and `contentTypes` if a new
kind of raw article asset needs to be copied to the static build.

## Validation and continuous integration

`scripts/validate-articles.mjs` checks that an article:

- is named `index.md` or `index.mdx`;
- is formatted with Prettier;
- has valid YAML frontmatter and all required fields;
- uses a category registered in `src/lib/docs.ts`;
- has a non-empty body; and
- references local assets that exist with the correct letter case.

Pull requests into `main` run `.github/workflows/validate-articles.yml`. The
workflow runs `npm ci`, `npm run check`, and article validation for files added
or renamed relative to the pull request's base commit.

When changing content schemas, routing, layouts, or build behavior, run at least:

```sh
npm run check
npm run lint
npm run build
```

## Search

`npm run build` performs three operations in sequence:

1. validates Astro and TypeScript;
2. generates the static site in `dist`; and
3. runs Pagefind over `dist` to create the search index.

The React search component loads `/pagefind/pagefind.js` at runtime. Consequently,
search works in the deployed site and after a production build, but not from a
fresh `npm run dev` session.

## Deployment

The committed `wrangler.jsonc` uploads `dist` as static assets and enforces
trailing-slash URLs. Build the site before deploying:

```sh
npm run build
npm run deploy
```

For Cloudflare Workers Builds, configure:

```text
Build command:  npm run build
Deploy command: npm run deploy
```

Do not run Wrangler's automatic Astro setup or add `@astrojs/cloudflare`; the
adapter is only required for server-rendered Astro routes.

For a Cloudflare Pages project, use `npm run build` as the build command and
`dist` as the output directory. Pages does not need a separate deploy command.
