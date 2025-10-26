import { defineCollection, z } from "@nuxt/content";

// Common schemas following reference project pattern
const commonContentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
});

// Article and Portfolio schemas removed - building data structure

export const collections = {
  // Main content pages
  content: defineCollection({
    type: "page",
    source: {
      include: "**/*.md",
      exclude: ["articles/*.md", "portfolio/*.md"],
      prefix: "/",
    },
    schema: commonContentSchema,
  }),
  // Articles (blog posts)
  articles: defineCollection({
    type: "page",
    source: {
      include: "articles/*.md",
      prefix: "/articles",
    },
    // No schema - allows flexible data structure while building
  }),
  // Portfolio projects
  portfolio: defineCollection({
    type: "page",
    source: {
      include: "portfolio/*.md",
      prefix: "/portfolio",
    },
    // No schema - allows flexible data structure while building
  }),
};
