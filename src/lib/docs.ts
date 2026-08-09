import { getCollection, type CollectionEntry } from 'astro:content'

export type DocEntry = CollectionEntry<'docs'>

export interface TopicDefinition {
  name: string
  category: string
  slug: string
  description: string
  icon: string
}

export const topics: TopicDefinition[] = [
  {
    name: 'Chat & memory',
    category: 'Chat & memory',
    slug: 'chat-memory',
    description: 'Manage conversations, message actions, translation, and Long-Term Memory.',
    icon: 'comment-discussion',
  },
  {
    name: 'Models & performance',
    category: 'Models & performance',
    slug: 'models-performance',
    description: 'Choose, configure, and tune local or cloud models for your device.',
    icon: 'ai-model',
  },
  {
    name: 'Characters & voice',
    category: 'Characters & voice',
    slug: 'characters-voice',
    description: 'Create and import characters, then give them local voices and voice chat.',
    icon: 'person',
  },
  {
    name: 'Agents & tools',
    category: 'Agents & tools',
    slug: 'agents-tools',
    description: 'Build on-device agents that use functions, Python, APIs, and MCP tools.',
    icon: 'agent',
  },
  {
    name: 'Mini-apps & integrations',
    category: 'Mini-apps & integrations',
    slug: 'mini-apps-integrations',
    description: 'Add optional features, build mini-apps, and connect Layla to Android tools.',
    icon: 'apps',
  },
  {
    name: 'Image generation',
    category: 'Image generation',
    slug: 'image-generation',
    description: 'Create images locally and connect generation to characters.',
    icon: 'image',
  },
  {
    name: 'Troubleshooting',
    category: 'Troubleshooting',
    slug: 'troubleshooting',
    description: 'Fix model loading, performance, setup, and app issues.',
    icon: 'tools',
  },
]

export function docSlug(id: string) {
  return id.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')
}

export function docHref(id: string) {
  const slug = docSlug(id)
  return slug ? `/${slug}/` : '/'
}

export function topicForCategory(category: string) {
  return topics.find((topic) => topic.category === category) ?? {
    name: category,
    category,
    slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: `Guides and answers about ${category.toLowerCase()}.`,
    icon: 'book',
  }
}

export function topicHref(category: string) {
  return `/topics/${topicForCategory(category).slug}/`
}

export function estimateReadingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>|[#>*_`[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 210))
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
