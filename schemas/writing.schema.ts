import { z } from 'zod'
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
 * Defines structure for blog posts and articles
 */
export const writingCollectionSchema = z.object({
  // Estimated reading time in minutes
  minRead: z.number(),

  // Publication date
  date: z.date(),

  // Featured image
  image: z.string().nonempty().editor({ input: 'media' }),

  // Article author
  author: createAuthorSchema()
})
