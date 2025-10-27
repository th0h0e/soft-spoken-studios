import { property, z } from "@nuxt/content";

// Portfolio/Projects schema
export const portfolioSchema = z.object({
  // Core fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Project details
  client: z.string().optional(),

  // Project status
  status: z.enum(["completed", "in-progress", "planned"]).optional().default("completed"),
  featured: z.boolean().optional().default(false),

  // Visual assets
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),
  gallery: z.array(z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  })).optional().default([]),

  // Project content sections
  overview: z.string().optional(),

  // Project metadata
  duration: z.string().optional(),
  year: z.number().optional(),

  // SEO metadata
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});
