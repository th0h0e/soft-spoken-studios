import { property, z } from "@nuxt/content";

// Gallery data schema
export const gallerySchema = z.object({
  items: z.array(z.object({
    image: z.object({
      src: property(z.string()).editor({ input: 'media' }),
      alt: z.string().optional(),
    }).optional(),
    caption: z.string().optional(),
  })).optional().default([]),
});
