import Slugger from 'github-slugger'
import { satteriCollectHastText } from '@astrojs/markdown-satteri'

const ALL_HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const ANCHORED_HEADINGS = new Set(['h2', 'h3'])

function toClassList(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return value.split(/\s+/).filter(Boolean)
  return []
}

/**
 * The visible "#" glyph comes from CSS, and the screen-reader label is filled in
 * by DocsLayout, so the anchor contributes no text to the heading. That keeps
 * the generated slug and the table-of-contents entry free of anchor text.
 */
function anchorFor(id) {
  return {
    type: 'element',
    tagName: 'a',
    properties: { className: ['heading-anchor'], href: `#${id}`, dataHeadingAnchor: '' },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sr-only'], dataHeadingAnchorLabel: '' },
        children: [],
      },
    ],
  }
}

/**
 * Gives every h2/h3 a copyable anchor link. Ids are assigned here rather than
 * left to Sätteri's own heading-ids pass, which runs after user plugins; that
 * pass reuses an id it finds, so slugs stay identical to the untouched build.
 */
export function satteriHeadingAnchors() {
  return () => {
    const slugger = new Slugger()
    return {
      name: 'heading-anchors',
      element: {
        filter: ALL_HEADINGS,
        visit(node, ctx) {
          const existingId = node.properties?.id
          let id = existingId
          if (typeof id !== 'string') {
            const rawText = ctx.textContent(node)
            const text = rawText.includes('frontmatter')
              ? satteriCollectHastText(node, ctx.data.astro?.frontmatter ?? {})
              : rawText
            id = slugger.slug(text)
            ctx.setProperty(node, 'id', id)
          }

          if (!ANCHORED_HEADINGS.has(node.tagName)) return
          ctx.setProperty(node, 'className', [...toClassList(node.properties?.className), 'heading-anchored'])
          ctx.appendChild(node, anchorFor(id))
        },
      },
    }
  }
}
