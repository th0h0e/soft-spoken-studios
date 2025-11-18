import { z } from 'zod'

/**
 * Letter collection schema
 * Used for the Letter component with header, title, subtitle, and paragraphs
 */
export const letterCollectionSchema = z.object({
  headerText: z.string(),
  title: z.string(),
  subtitle: z.string(),
  paragraphs: z.array(z.object({
    text: z.string(),
    italic: z.boolean()
  }))
})
