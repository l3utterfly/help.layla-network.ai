import type { ImageMetadata } from 'astro'
import type { CollectionEntry } from 'astro:content'

export interface ArticleSeoImage {
  src: ImageMetadata
  alt: string
}

const articleImages = import.meta.glob<ImageMetadata>(
  '../content/docs/**/*.{avif,gif,jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
)

function removeCode(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, (match) => ' '.repeat(match.length))
    .replace(/~~~[\s\S]*?~~~/g, (match) => ' '.repeat(match.length))
    .replace(/(`+)[^\n]*?\1/g, (match) => ' '.repeat(match.length))
}

function normalizePath(value: string) {
  const parts: string[] = []

  for (const part of value.replaceAll('\\', '/').split('/')) {
    if (!part || part === '.') continue
    if (part === '..') {
      parts.pop()
      continue
    }
    parts.push(part)
  }

  return parts.join('/')
}

function firstMarkdownImage(markdown: string) {
  const searchable = removeCode(markdown)
  const match = searchable.match(
    /!\[([^\]\n]*)\]\(\s*(?:<([^>\n]+)>|((?:\\.|[^\s)])+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/,
  )

  if (!match) return undefined

  return {
    alt: match[1].trim(),
    path: (match[2] ?? match[3]).replaceAll('\\ ', ' '),
  }
}

export function getArticleSeoImage(entry: CollectionEntry<'docs'>): ArticleSeoImage | undefined {
  const image = firstMarkdownImage(entry.body ?? '')
  if (!image || !entry.filePath) return undefined

  const imagePath = image.path.split(/[?#]/, 1)[0]
  if (/^(?:[a-z]+:)?\/\//i.test(imagePath) || imagePath.startsWith('data:')) return undefined

  const sourcePath = entry.filePath.replaceAll('\\', '/').replace(/^src\//, '')
  const sourceDirectory = sourcePath.slice(0, sourcePath.lastIndexOf('/'))
  const contentPath = imagePath.startsWith('/assets/articles/')
    ? `content/docs/${imagePath.slice('/assets/articles/'.length)}`
    : `${sourceDirectory}/${imagePath}`
  const importKey = `../${normalizePath(contentPath)}`
  const src = articleImages[importKey]

  if (!src) {
    throw new Error(`Could not resolve the first article image ${image.path} in ${entry.filePath}.`)
  }

  return {
    src,
    alt: image.alt || entry.data.title,
  }
}
