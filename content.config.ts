import { defineCollection, defineContentConfig, property, z } from "@nuxt/content";

// Common schemas following reference project pattern
const commonContentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
});

// Articles/Blog schema
const articlesSchema = z.object({
  // Core fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Optional content fields
  excerpt: z.string().optional(),
  image: z.object({
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

// Portfolio/Projects schema
const portfolioSchema = z.object({
  // Core fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Project details
  client: z.string().optional(),
  category: z.string().optional(),
  services: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),

  // Project status
  status: z.enum(["completed", "in-progress", "planned"]).optional().default("completed"),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),

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
  challenges: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),

  // Links
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),

  // Project metadata
  duration: z.string().optional(),
  year: z.string().optional(),

  // SEO metadata
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

export default defineContentConfig({
  collections: {
    // Main content pages
    content: defineCollection({
      type: "page",
      source: {
        include: "**/*.md",
        exclude: ["articles/*.md", "portfolio/*.md"],
        prefix: "/",
      },
      schema: commonContentSchema,
    }),
    // Articles (blog posts)
    articles: defineCollection({
      type: "page",
      source: {
        include: "articles/*.md",
        prefix: "/articles",
      },
      schema: articlesSchema,
    }),
    // Portfolio projects
    portfolio: defineCollection({
      type: "page",
      source: {
        include: "portfolio/*.md",
        prefix: "/portfolio",
      },
      schema: portfolioSchema,
    }),
  },
});
