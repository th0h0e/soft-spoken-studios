import { z } from 'zod'
import { createBaseSchema, createButtonSchema, createImageSchema, createTestimonialSchema } from './common.schema'

/**
 * Homepage/Index collection schema
 * Contains all sections for the landing page
 */
export const indexCollectionSchema = z.object({
  // Hero section
  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),

  // About section
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
  }),

  // Testimonials section
  testimonials: z.array(createTestimonialSchema()),

  // Writing/Blog section
  writing: createBaseSchema(),

  // FAQ section
  faq: createBaseSchema().extend({
    categories: z.array(
      z.object({
        title: z.string().nonempty(),
        questions: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      })
    )
  })
})
