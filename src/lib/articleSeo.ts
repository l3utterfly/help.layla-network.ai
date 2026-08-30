import type { ImageMetadata } from 'astro'
import type { CollectionEntry } from 'astro:content'

export interface ArticleSeoImage {
  src: ImageMetadata
  alt: string
}

export interface ArticleFeatureImage extends ArticleSeoImage {
  type: 'image'
}

export interface ArticleFeatureVideo {
  type: 'video'
  src: string
  title: string
  embed: boolean
}

export type ArticleFeatureMedia = ArticleFeatureImage | ArticleFeatureVideo

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

function htmlAttribute(tag: string, name: string) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, 'i'),
  )

  return match ? (match[1] ?? match[2] ?? match[3]) : undefined
}

function firstArticleVideo(markdown: string) {
  const searchable = removeCode(markdown)
  const candidates: Array<{
    index: number
    path: string
    title?: string
    embed: boolean
  }> = []

  for (const match of searchable.matchAll(/<video\b[^>]*>/gi)) {
    const path = htmlAttribute(match[0], 'src')
    if (path) {
      candidates.push({
        index: match.index,
        path,
        title: htmlAttribute(match[0], 'title'),
        embed: false,
      })
    }
  }

  for (const match of searchable.matchAll(/<iframe\b[^>]*>/gi)) {
    const path = htmlAttribute(match[0], 'src')
    if (!path) continue

    try {
      const url = new URL(path)
      const hostname = url.hostname.replace(/^www\./, '')
      if (!['youtube.com', 'youtube-nocookie.com'].includes(hostname) || !url.pathname.startsWith('/embed/')) {
        continue
      }
    } catch {
      continue
    }

    candidates.push({
      index: match.index,
      path,
      title: htmlAttribute(match[0], 'title'),
      embed: true,
    })
  }

  return candidates.sort((left, right) => left.index - right.index)[0]
}

function resolveArticleAssetPath(entry: CollectionEntry<'docs'>, assetPath: string) {
  const cleanPath = assetPath.split(/[?#]/, 1)[0]
  if (/^(?:[a-z]+:)?\/\//i.test(cleanPath) || cleanPath.startsWith('data:')) return assetPath
  if (cleanPath.startsWith('/')) return assetPath
  if (!entry.filePath) return undefined

  const sourcePath = entry.filePath.replaceAll('\\', '/').replace(/^src\/content\/docs\//, '')
  const sourceDirectory = sourcePath.slice(0, sourcePath.lastIndexOf('/'))
  return `/assets/articles/${normalizePath(`${sourceDirectory}/${cleanPath}`)}`
}

export function getArticleFeatureMedia(entry: CollectionEntry<'docs'>): ArticleFeatureMedia | undefined {
  const image = getArticleSeoImage(entry)
  if (image) return { type: 'image', ...image }

  const video = firstArticleVideo(entry.body ?? '')
  if (!video) return undefined

  const src = video.embed ? video.path : resolveArticleAssetPath(entry, video.path)
  if (!src) return undefined

  return {
    type: 'video',
    src,
    title: video.title?.trim() || entry.data.title,
    embed: video.embed,
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
