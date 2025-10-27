import { defineCollection, defineContentConfig } from "@nuxt/content";

// Import schemas from separate files
import { articlesSchema } from "./schemas/articles.schema";
import { portfolioSchema } from "./schemas/portfolio.schema";
import { gallerySchema } from "./schemas/gallery.schema";
import { siteSettingsSchema } from "./schemas/settings.schema";

export default defineContentConfig({
  collections: {
    // Articles (blog posts)
    articles: defineCollection({
      type: "page",
      source: {
        include: "articles/*.md",
        prefix: "/articles",
      },
      schema: articlesSchema,
    }),
    // Portfolio projects
    portfolio: defineCollection({
      type: "page",
      source: {
        include: "portfolio/*.md",
        prefix: "/portfolio",
      },
      schema: portfolioSchema,
    }),
    // Site Settings (data collection)
    settings: defineCollection({
      type: "data",
      source: "settings.yml",
      schema: siteSettingsSchema,
    }),
    // Gallery (data collection)
    gallery: defineCollection({
      type: "data",
      source: "gallery.yml",
      schema: gallerySchema,
    }),
  },
});
