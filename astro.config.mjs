import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { satteriHeadingAnchors } from "./src/lib/satteri-heading-anchors.mjs";

export default defineConfig({
  site: "https://help.layla-network.ai",
  output: "static",
  trailingSlash: "always",
  i18n: {
    locales: ["en", "fr", "de", "it", "ja", "ko"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: satteri({ hastPlugins: [satteriHeadingAnchors()] }),
  },
  integrations: [react(), sitemap()],
});
