import type { APIRoute, GetStaticPaths } from 'astro'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const docsDirectory = path.resolve('src/content/docs')
const publishedAssetExtensions = new Set(['.json', '.mp4'])

const contentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

interface ArticleAsset {
  filePath: string
}

async function findArticleAssets(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const assets: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      assets.push(...await findArticleAssets(entryPath))
      continue
    }

    if (entry.isFile() && publishedAssetExtensions.has(path.extname(entry.name).toLowerCase())) {
      assets.push(entryPath)
    }
  }

  return assets
}

export const getStaticPaths: GetStaticPaths = async () => {
  const assets = await findArticleAssets(docsDirectory)

  return assets.map((filePath) => ({
    params: {
      path: path.relative(docsDirectory, filePath).split(path.sep).join('/'),
    },
    props: { filePath } satisfies ArticleAsset,
  }))
}

export const GET: APIRoute<ArticleAsset> = async ({ props }) => {
  const extension = path.extname(props.filePath).toLowerCase()
  const body = await readFile(props.filePath)

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
    },
  })
}
