import { z } from 'zod'

/**
 * Book Cover collection schema
 * Used for the Book component displaying book cover-style layouts
 *
 * Structure:
 * - author: Author name displayed at the top
 * - title: Single string that will be split by words for display
 * - subtitle: Italic subtitle text
 * - postscript: Array of text lines shown after divider
 * - editor: Editor/publisher information
 */
export const bookCollectionSchema = z.object({
  author: z.string(),
  title: z.string(),
  subtitle: z.string(),
  postscript: z.array(z.string()),
  editor: z.string()
})
