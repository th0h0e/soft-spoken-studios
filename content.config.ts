import { defineCollection, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().url().optional(),
  readingTime: z.string().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  excerpt: z.string().optional(),
})

const portfolioSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().url().optional(),
  client: z.string().optional(),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  excerpt: z.string().optional(),
  projectUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
})

export const collections = {
  articles: defineCollection({
    type: 'page',
    source: {
      include: 'articles/**/*.md',
      prefix: '/articles',
    },
    schema: articleSchema,
  }),
  portfolio: defineCollection({
    type: 'page',
    source: {
      include: 'portfolio/**/*.md',
      prefix: '/portfolio',
    },
    schema: portfolioSchema,
  }),
}