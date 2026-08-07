import { getCollection, type CollectionEntry } from 'astro:content'

export type DocEntry = CollectionEntry<'docs'>

export interface TopicDefinition {
  name: string
  category: string
  slug: string
  description: string
}

export const topics: TopicDefinition[] = [
  {
    name: 'Getting started',
    category: 'Getting started',
    slug: 'getting-started',
    description: 'Install Layla, choose a model, and begin your first private conversation.',
  },
  {
    name: 'Installing & licences',
    category: 'Installing & licences',
    slug: 'installing-licences',
    description: 'Downloads, purchases, licences, and moving Layla between devices.',
  },
  {
    name: 'Models & GGUF quants',
    category: 'Models',
    slug: 'models-gguf-quants',
    description: 'Choose, download, and run GGUF models that fit your device.',
  },
  {
    name: 'Characters & Live2D',
    category: 'Characters & Live2D',
    slug: 'characters-live2d',
    description: 'Create, import, and animate characters and their personalities.',
  },
  {
    name: 'Companion mode',
    category: 'Companion mode',
    slug: 'companion-mode',
    description: 'Set up an always-ready companion experience on your device.',
  },
  {
    name: 'Agents & scripts',
    category: 'Agents & scripts',
    slug: 'agents-scripts',
    description: 'Automate useful tasks with agents, scripts, and mini-apps.',
  },
  {
    name: 'Voice / PocketTTS',
    category: 'Voice / PocketTTS',
    slug: 'voice-pockettts',
    description: 'Configure local speech, voices, and PocketTTS.',
  },
  {
    name: 'Image generation',
    category: 'Image generation',
    slug: 'image-generation',
    description: 'Create images locally and connect generation to characters.',
  },
  {
    name: 'Layla Cloud',
    category: 'Layla Cloud',
    slug: 'layla-cloud',
    description: 'Use optional cloud inference and connected services.',
  },
  {
    name: 'Privacy & data',
    category: 'Privacy & data',
    slug: 'privacy-data',
    description: 'Understand what stays local and how your data is stored.',
  },
  {
    name: 'Troubleshooting',
    category: 'Support',
    slug: 'troubleshooting',
    description: 'Fix model loading, performance, setup, and app issues.',
  },
  {
    name: 'Advanced / dev',
    category: 'Advanced / dev',
    slug: 'advanced-dev',
    description: 'Explore endpoints, integrations, development, and diagnostics.',
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
