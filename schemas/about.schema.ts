import { z } from 'zod'
import { createImageSchema } from './common.schema'

/**
 * About page collection schema
 * Defines structure for the about page content
 */
export const aboutCollectionSchema = z.object({
  // Content object (can be extended later with specific fields)
  content: z.object({}),

  // Images for the about page
  images: z.array(createImageSchema())
})
