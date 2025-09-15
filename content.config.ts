import { defineCollection, z } from '@nuxt/content'

// Common schemas following reference project pattern
const commonContentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
})

const commonArticleSchema = z.object({
  title: z.string().nonempty(),
  preview: z.string().nonempty(),
  date: z.string().nonempty(),
  heroImage: z.string().nonempty(),
  heroImageDescription: z.string().nonempty(),
  contentImage: z.string().nonempty(),
  contentImageDescription: z.string().nonempty(),
  paragraphOne: z.string().nonempty(),
  paragraphTwo: z.string().nonempty(),
  sources: z.array(z.object({
    title: z.string().nonempty(),
    url: z.string().url(),
    description: z.string().optional()
  })).optional(),
  tags: z.array(z.string().nonempty()).optional(),
  featured: z.boolean().optional(),
  // Legacy compatibility
  image: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  readingTime: z.string().optional(),
})

const commonPortfolioSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
  image: z.string().optional(),
  client: z.string().optional(),
  featured: z.boolean().optional(),
})


export const collections = {
  // Main content collections (following Reference Project pattern exactly)
  content_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/**/*.md',
      exclude: ['en/articles/*.md'],
      prefix: '/en',
    },
    schema: commonContentSchema,
  }),
  content_nl: defineCollection({
    type: 'page',
    source: {
      include: 'nl/**/*.md',
      exclude: ['nl/articles/*.md'],
      prefix: '/nl',
    },
    schema: commonContentSchema,
  }),
  content_sv: defineCollection({
    type: 'page',
    source: {
      include: 'sv/**/*.md',
      exclude: ['sv/articles/*.md'],
      prefix: '/sv',
    },
    schema: commonContentSchema,
  }),
  // Articles collections (following Reference Project pattern)
  articles_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/articles/*.md',
      prefix: '/en/articles',
    },
    schema: commonArticleSchema,
  }),
  articles_nl: defineCollection({
    type: 'page',
    source: {
      include: 'nl/articles/*.md',
      prefix: '/nl/articles',
    },
    schema: commonArticleSchema,
  }),
  articles_sv: defineCollection({
    type: 'page',
    source: {
      include: 'sv/articles/*.md',
      prefix: '/sv/articles',
    },
    schema: commonArticleSchema,
  }),
  // Portfolio collections
  portfolio_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/portfolio/*.md',
      prefix: '/en/portfolio',
    },
    schema: commonPortfolioSchema,
  }),
  portfolio_nl: defineCollection({
    type: 'page',
    source: {
      include: 'nl/portfolio/*.md',
      prefix: '/nl/portfolio',
    },
    schema: commonPortfolioSchema,
  }),
  portfolio_sv: defineCollection({
    type: 'page',
    source: {
      include: 'sv/portfolio/*.md',
      prefix: '/sv/portfolio',
    },
    schema: commonPortfolioSchema,
  }),
}