import { z } from 'zod'

/**
 * TwoImages collection schema
 * Used for the TwoImages component displaying 2 images in a responsive grid
 *
 * Note: The component expects page.images.image1 and page.images.image2,
 * but the YAML currently has a different structure. You may need to update
 * either the component or the YAML to match.
 */
export const twoImagesCollectionSchema = z.object({
  twoimages: z.object({
    links: z.object({
      to: z.string()
    }).optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      title: z.string().optional(),
      link: z.string().optional()
    }))
  })
})
