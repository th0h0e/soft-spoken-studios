import { defineCollection, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().optional().editor({ input: 'media' }),
  readingTime: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  excerpt: z.string().optional(),
})

const portfolioSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().optional().editor({ input: 'media' }),
  client: z.string().optional(),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  excerpt: z.string().optional(),
  projectUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
})

const aboutSchema = z.object({
  title: z.string(),
  section: z.string(),
  order: z.number(),
  featured: z.boolean().default(false),
  skills: z.array(z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
  experiences: z.array(z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
  })).optional(),
  clients: z.array(z.object({
    name: z.string(),
    project: z.string(),
  })).optional(),
  principles: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
  values: z.array(z.string()).optional(),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string().optional(),
    program: z.string().optional(),
    period: z.string(),
    description: z.string(),
  })).optional(),
  certifications: z.array(z.object({
    name: z.string(),
    year: z.string(),
  })).optional(),
  continuous_learning: z.array(z.string()).optional(),
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
  about: defineCollection({
    type: 'page',
    source: {
      include: 'about/**/*.md',
      prefix: '/about',
    },
    schema: aboutSchema,
  }),
}