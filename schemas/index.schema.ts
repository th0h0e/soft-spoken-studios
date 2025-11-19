import { z } from 'zod'
import { createBaseSchema, createTestimonialSchema } from './common.schema'

/**
 * Homepage/Index collection schema
 * Contains all sections for the landing page
 */
export const indexCollectionSchema = z.object({
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
