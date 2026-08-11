import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().default("Guides"),
    order: z.number().int().default(999),
    keywords: z.array(z.string()).default([]),
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    translationKey: z.string().min(1).optional(),
  }),
});

export const collections = { docs };
