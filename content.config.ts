import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'

// ========================================================================
// REUSABLE SCHEMA HELPERS
// These are building blocks used across multiple collections
// ========================================================================

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional()
  })
})

// ========================================================================
// COLLECTIONS
// Data sources and routes for the application
// ========================================================================

export default defineContentConfig({
  collections: {
    // ========================================================================
    // PAGE COLLECTIONS (type: 'page')
    // These represent actual pages/routes in the application
    // ========================================================================

    // Homepage (/) - Main landing page
    index: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: z.object({})
    }),

    // About Page (/about)
    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({})
    }),

    // Individual Project Pages (/projects/[slug])
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        image: z.string().nonempty().editor({ input: 'media' }),
        tags: z.array(z.string()),
        date: z.date(),
        client: z.string().optional(),
        role: z.string().optional(),
        year: z.string().optional(),
        gallery: z.array(z.string()).optional()
      })
    }),

    // Individual Blog Posts (/writing/[slug])
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        minRead: z.number(),
        date: z.date(),
        image: z.object({
          src: property(z.string()).editor({ input: 'media' }),
          alt: z.string()
        }),
        author: z.object({
          name: z.string(),
          avatar: createImageSchema().optional()
        })
      })
    }),

    // Collection Pages - Metadata for /projects and /writing listing pages
    collectionPages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'writing.yml' }
      ],
      schema: z.object({})
    }),

    // ========================================================================
    // DATA COLLECTIONS (type: 'data')
    // Reusable data components used across pages
    // ========================================================================

    gallery: defineCollection({
      type: 'data',
      source: 'gallery.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(z.object({
          image: z.string().editor({ input: 'media' }),
          caption: z.string(),
          quote: z.string()
        }))
      })
    })
  }
})
