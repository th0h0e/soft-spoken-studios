import { property, z } from "@nuxt/content";

// Site Settings data schema (for global configuration)
export const siteSettingsSchema = z.object({
  // Site Information
  siteName: z.string().default("Soft Spoken Studios"),
  tagline: z.string().default("We can write your talk, and capture your walk"),
  description: z.string().default("Creative communication and strategic storytelling"),

  // Contact Information
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),

  // Social Media Profiles
  social: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),

  // SEO & Branding
  seo: z.object({
    defaultTitle: z.string().optional(),
    titleTemplate: z.string().optional(),
    defaultDescription: z.string().optional(),
    defaultOgImage: property(z.string()).editor({ input: 'media' }).optional(),
    favicon: property(z.string()).editor({ input: 'media' }).optional(),
    appleTouchIcon: property(z.string()).editor({ input: 'media' }).optional(),
  }).optional(),

  // Video Configuration
  video: z.object({
    homepage: z.string().url().optional(),
    thumbnail: property(z.string()).editor({ input: 'media' }).optional(),
  }).optional(),
});
