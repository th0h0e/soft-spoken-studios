import { defineCollection, defineContentConfig, property, z } from "@nuxt/content";

// Articles/Blog schema
const articlesSchema = z.object({
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

// Portfolio/Projects schema
const portfolioSchema = z.object({
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

// Gallery data schema
const gallerySchema = z.object({
  items: z.array(z.object({
    image: z.object({
      src: property(z.string()).editor({ input: 'media' }),
      alt: z.string().optional(),
    }).optional(),
    caption: z.string().optional(),
  })).optional().default([]),
});

// Site Settings data schema (for global configuration)
const siteSettingsSchema = z.object({
  // Site Information
  siteName: z.string().default("Soft Spoken Studios"),
  tagline: z.string().default("We can write your talk, and capture your walk"),
  description: z.string().default("Creative communication and strategic storytelling"),

  // Contact Information
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),

  // Social Media Profiles
  social: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),

  // SEO & Branding
  seo: z.object({
    defaultTitle: z.string().optional(),
    titleTemplate: z.string().optional(),
    defaultDescription: z.string().optional(),
    defaultOgImage: property(z.string()).editor({ input: 'media' }).optional(),
    favicon: property(z.string()).editor({ input: 'media' }).optional(),
    appleTouchIcon: property(z.string()).editor({ input: 'media' }).optional(),
  }).optional(),

  // Video Configuration
  video: z.object({
    homepage: z.string().url().optional(),
  }).optional(),
});

export default defineContentConfig({
  collections: {
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
    // Site Settings (data collection)
    settings: defineCollection({
      type: "data",
      source: "settings.yml",
      schema: siteSettingsSchema,
    }),
    // Gallery (data collection)
    gallery: defineCollection({
      type: "data",
      source: "gallery.yml",
      schema: gallerySchema,
    }),
  },
});
