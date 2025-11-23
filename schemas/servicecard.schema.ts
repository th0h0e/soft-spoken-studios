import { z } from 'zod'

/**
 * ServiceCard component schema
 * Used for displaying service cards with images, badges, and descriptions
 *
 * Usage in markdown:
 * ::service-cards
 * ---
 * cards:
 *   - image: /path/to/image.jpg
 *     imageAlt: Video production
 *     badge: Service
 *     title: Video Production
 *     icon: feather:play
 *     iconLabel: Creative Storytelling
 *     description: Stories that move.
 * ::
 */
export const serviceCardSchema = z.object({
  cards: z.array(z.object({
    image: z.string(),
    imageAlt: z.string().optional(),
    badge: z.string().optional(),
    title: z.string(),
    icon: z.string().optional(),
    iconLabel: z.string().optional(),
    description: z.string()
  }))
})
