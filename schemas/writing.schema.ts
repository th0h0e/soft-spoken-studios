import { z } from 'zod'
import { property } from '@nuxt/content'
import { createImageSchema } from './common.schema'

/**
 * Author schema for blog posts
 * Used specifically in writing/blog collection
 */
const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

/**
 * Writing/Blog collection schema
 * Defines structure for individual blog posts
 */
export const writingCollectionSchema = z.object({
  // Title of the post
  title: z.string(),

  // Description/summary of the post
  description: z.string(),

  // Estimated reading time in minutes
  minRead: z.number(),

  // Publication date
  date: z.date(),

  // Featured image
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string()
  }),

  // Post author
  author: createAuthorSchema()
})
