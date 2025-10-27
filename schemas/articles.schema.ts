import { property, z } from "@nuxt/content";

// Articles/Blog schema
export const articlesSchema = z.object({
  // Core fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Optional content fields
  excerpt: z.string().optional(),
  text1: z.string().optional(),
  text2: z.string().optional(),
  text3: z.string().optional(),
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),
  footerImage: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),

  // Categorization
  tags: z.array(z.string()).optional().default([]),
  category: z.string().optional(),

  // Status and visibility
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),

  // Author information
  author: z.object({
    name: z.string(),
  }).optional(),

  // Reading metadata
  readingTime: z.string().optional(),

  // SEO metadata
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});
