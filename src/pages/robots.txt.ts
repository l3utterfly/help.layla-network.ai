import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://help.layla-network.ai')
  const sitemap = new URL('/sitemap-index.xml', origin)

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`)
}
