import { z } from 'zod'

/**
 * SEO meta schema
 * Used for SEO-specific fields in collections
 */
export const createSeoSchema = () => z.object({
  title: z.string().optional(),
  description: z.string().optional()
}).optional().default({})
