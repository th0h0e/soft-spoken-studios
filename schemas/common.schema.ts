import { z } from 'zod'

/**
 * Base schema with title and description
 * Used across multiple collections (index, experience, faq, writing)
 */
export const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

/**
 * Button/Link schema
 * Used for CTAs, navigation links, etc.
 */
export const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

/**
 * Image schema
 * Used for all image fields across collections
 */
export const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

/**
 * Testimonial schema
 * Used in the index/homepage collection
 */
export const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional()
  })
})
