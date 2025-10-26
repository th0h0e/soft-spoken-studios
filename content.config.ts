import { defineCollection, z } from "@nuxt/content";

// Common schemas following reference project pattern
const commonContentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
});

const commonArticleSchema = z.object({
  title: z.string().nonempty(),
  date: z.string().nonempty(),
  // New schema fields (optional for backward compatibility)
  preview: z.string().optional(),
  heroImage: z.string().optional().editor({ input: 'media' }),
  heroImageDescription: z.string().optional(),
  contentImage: z.string().optional().editor({ input: 'media' }),
  contentImageDescription: z.string().optional(),
  paragraphOne: z.string().optional(),
  paragraphTwo: z.string().optional(),
  sources: z
    .array(
      z.object({
        title: z.string().nonempty(),
        url: z.string().url(),
        description: z.string().optional(),
      })
    )
    .optional(),
  tags: z.array(z.string().nonempty()).optional(),
  featured: z.boolean().optional(),
  // Legacy fields (still in use by current articles)
  image: z.string().optional().editor({ input: 'media' }),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  readingTime: z.string().optional(),
});

const commonPortfolioSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
  client: z.string().optional(),
  category: z.string().optional(),
  services: z.array(z.string()).optional(),
  status: z.enum(["completed", "in-progress", "planned"]).optional(),
  featured: z.boolean().optional(),
  overview: z.string().optional(),
  challenges: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  duration: z.string().optional(),
  image: z.string().optional().editor({ input: 'media' }),
});

export const collections = {
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
    schema: commonArticleSchema,
  }),
  // Portfolio projects
  portfolio: defineCollection({
    type: "page",
    source: {
      include: "portfolio/*.md",
      prefix: "/portfolio",
    },
    schema: commonPortfolioSchema,
  }),
};
