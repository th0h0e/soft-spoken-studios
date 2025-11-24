import { z } from 'zod'

/**
 * Gallery collection schema
 * Used for the gallery page displaying images with quotes
 */
export const galleryCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(z.object({
    image: z.string().editor({ input: 'media' }),
    quote: z.string()
  }))
})
