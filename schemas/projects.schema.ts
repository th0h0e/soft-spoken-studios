import { z } from 'zod'

export const projectsCollectionSchema = z.object({
  image: z.string().nonempty().editor({ input: 'media' }),

  tags: z.array(z.string()),

  date: z.date(),

  client: z.string().optional(),

  role: z.string().optional(),

  year: z.string().optional(),

  gallery: z.array(z.string()).optional()
})
