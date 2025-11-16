import { z } from 'zod'
import { createButtonSchema } from './common.schema'

/**
 * Pages collection schema
 * Used for general pages like projects.yml and writing.yml
 * Defines navigation links and CTAs
 */
export const pagesCollectionSchema = z.object({
  // Array of button/link elements
  links: z.array(createButtonSchema())
})
