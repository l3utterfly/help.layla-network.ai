import { getCollection, type CollectionEntry } from 'astro:content'

export type DocEntry = CollectionEntry<'docs'>

export function docSlug(id: string) {
  return id.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')
}

export function docHref(id: string) {
  const slug = docSlug(id)
  return slug ? `/${slug}/` : '/'
}

export async function getPublishedDocs() {
  const docs = await getCollection('docs', ({ data }) => !data.draft)

  return docs.sort((left, right) => {
    if (left.data.category !== right.data.category) {
      return left.data.category.localeCompare(right.data.category)
    }

    if (left.data.order !== right.data.order) {
      return left.data.order - right.data.order
    }

    return left.data.title.localeCompare(right.data.title)
  })
}
