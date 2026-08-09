# Contributing to the Layla Help wiki

This repository contains the articles published at
[help.layla-network.ai](https://help.layla-network.ai). Contributions that fix
mistakes, clarify instructions, update screenshots, or add useful guides are
welcome.

You do not need to install the website or know how to program to edit an
article. For most changes, you can work entirely in your web browser with a free
GitHub account.

## Make a quick edit

1. Open the article on [the Layla Help wiki](https://help.layla-network.ai).
2. Select **Edit this page on GitHub** near the bottom of the article.
3. Select the pencil icon on GitHub to open the editor.
4. Make your changes. Use the **Preview** tab to check the Markdown formatting.
5. Select **Commit changes** and follow GitHub's prompts to propose the change.
6. Open a pull request so a maintainer can review and publish it.

GitHub may ask you to create a fork or a new branch. This is expected: it gives
you a safe copy in which to make your changes without immediately changing the
live wiki.

For more help with the web editor, see
[Editing files in GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

## Find the article files

All wiki articles are in [`src/content/docs`](./src/content/docs). Each article
has its own folder containing an `index.md` file and any images or downloads it
uses:

```text
src/content/docs/importing-a-local-model/
├── index.md
├── model-picker.jpg
└── example-agent.json
```

The folder name becomes the article's web address. The example above would be
published at `/importing-a-local-model/`.

## Add a new article

The easiest way to start is to copy the structure of an existing article.

1. Choose a short folder name made of lowercase words separated by hyphens,
   such as `importing-a-local-model`.
2. In GitHub, create
   `src/content/docs/importing-a-local-model/index.md`. Typing the full path in
   the new-file name creates the folder too.
3. Copy the frontmatter example below to the top of the file and replace the
   example values.
4. Write the article below the second `---` line.
5. Add images or downloads to the same folder as `index.md`.
6. Preview the file, then propose the change with a pull request.

See [Creating new files in GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files)
if you have not used GitHub's web editor before.

## Add the article information

Every article starts with a small information block called **frontmatter**. It
must be the first thing in the file and must sit between two `---` lines.

```yaml
---
title: Importing a local model
description: Add a compatible local model to Layla.
category: Models & performance
order: 20
keywords:
  - GGUF
  - local model
lastUpdated: 2026-08-09
draft: false
---
```

- `title` is the heading shown at the top of the page.
- `description` is a one- or two-sentence summary shown below the title and in
  search results.
- `category` must be one of the categories listed below.
- `order` controls the article's position within its category. Lower numbers
  appear first. Use `10`, `20`, `30`, and so on to leave room for future pages.
- `keywords` contains words or phrases that help describe the page. Put each
  one on its own indented line beginning with `-`.
- `lastUpdated` is optional. When used, write the date as `YYYY-MM-DD`.
- `draft` is optional. Set it to `true` to keep an unfinished article off the
  published site, or `false` to publish it after the pull request is merged.

Use one of these exact category names:

- `Chat & memory`
- `Models & performance`
- `Characters & voice`
- `Agents & tools`
- `Mini-apps & integrations`
- `Image generation`
- `Troubleshooting`

If none of these categories fits, mention that in your pull request instead of
inventing a new category.

## Write with Markdown

Markdown is plain text with a few symbols for formatting. GitHub's **Preview**
tab shows what most Markdown will look like before you submit it.

```md
## A section heading

### A smaller heading

Write **bold text**, _italic text_, or `a setting or filename`.

- A bullet point
- Another bullet point

1. The first step
2. The second step

[Read another guide](/getting-started/)

![Describe what the screenshot shows.](./screenshot.jpg)
```

The website creates the page title from the frontmatter, so begin sections in
the article body with `##`. Do not add another `#` title.

When linking to another wiki article, use its web address rather than its file
path. For example:

```md
[Getting started with Layla](/getting-started/)
```

For an external website, use its complete address beginning with `https://`.

## Add images, videos, and downloads

Keep files beside the article's `index.md`. Use clear, lowercase filenames with
hyphens, such as `model-picker.jpg`. File names and references are
case-sensitive, so `Model-Picker.jpg` and `model-picker.jpg` are not the same.

Add an image with a relative path:

```md
![Layla's model picker showing the selected GGUF file.](./model-picker.jpg)
```

The words inside `[]` are alternative text. Briefly describe the useful content
of the image for readers who cannot see it. Avoid descriptions such as
"screenshot" that do not explain what the image shows.

Videos and downloadable JSON files also live in the article folder, but use the
article asset address:

```html
<video
  controls
  playsinline
  src="/assets/articles/importing-a-local-model/demo.mp4"
></video>
```

```md
[Download the example agent](/assets/articles/importing-a-local-model/example-agent.json)
```

To add these files in the browser, open the article's folder on GitHub and use
**Add file** → **Upload files**. Never upload passwords, API keys, private chat
logs, or other personal information.

## Make the article easy to follow

- Write for a reader who may be using the feature for the first time.
- Put steps in the order in which the reader should perform them.
- Use the exact names shown in Layla for buttons, menus, and settings.
- Use short headings so readers can scan the page.
- Explain what the reader should see after an important step.
- Add screenshots where the interface would otherwise be hard to find.
- Include likely problems and fixes when they are relevant.
- Check that instructions still match the current version of Layla.

## Before submitting

Check that:

- the title and description clearly explain the article;
- the category name is copied exactly from the list above;
- the body begins with a `##` heading rather than another page title;
- every image has useful alternative text;
- every link, image, video, and download points to the correct place;
- no private or secret information appears in the text or screenshots; and
- GitHub's Markdown preview looks as expected.

Open a pull request when you are ready. Automated checks will look for common
problems in new articles. A maintainer can help with formatting or technical
details during review, so it is fine to submit a useful contribution even if
you are unsure about something.

## Work on the website locally

Local setup, development commands, validation, architecture, and deployment are
documented separately in [the technical README](./README-TECHNICAL.md).
