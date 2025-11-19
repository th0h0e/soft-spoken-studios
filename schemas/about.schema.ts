import { z } from 'zod'
import { createBaseSchema, createButtonSchema, createImageSchema } from './common.schema'

/**
 * About page collection schema
 * Defines structure for the about page content
 */
export const aboutCollectionSchema = z.object({
  // Hero section
  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),

  // Content object (can be extended later with specific fields)
  content: z.object({}),

  // Images for the about page
  images: z.array(createImageSchema()),

  // About section (title and description)
  about: createBaseSchema(),

  // Experience/Work history section
  experience: createBaseSchema().extend({
    items: z.array(z.object({
      date: z.date(),
      position: z.string(),
      company: z.object({
        name: z.string(),
        url: z.string(),
        logo: z.string().editor({ input: 'icon' }),
        color: z.string()
      })
    }))
  })
})
