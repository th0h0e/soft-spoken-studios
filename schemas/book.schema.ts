import { z } from 'zod'

export const bookCollectionSchema = z.object({
  author: z.string(),
  title: z.array(z.string()),
  subtitle: z.string(),
  postscript: z.array(z.string()),
  editor: z.string()
})
