import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://help.layla-network.ai',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
})
