import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'

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

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

export default defineContentConfig({
  collections: {
    // ========================================================================
    // PAGE COLLECTIONS (type: 'page')
    // These represent actual pages/routes in the application
    // ========================================================================

    // Homepage (/) - Main landing page
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        testimonials: z.array(createTestimonialSchema()),
        faq: z.object({
          title: z.string(),
          description: z.string(),
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty()
                })
              )
            })
          )
        }),
        letter: z.object({
          headerText: z.string(),
          title: z.string(),
          subtitle: z.string(),
          paragraphs: z.array(z.object({
            text: z.string(),
            italic: z.boolean()
          }))
        }),
        book: z.object({
          author: z.string(),
          title: z.string(),
          subtitle: z.string(),
          postscript: z.array(z.string()),
          editor: z.string()
        }),
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
    }),

    // About Page (/about)
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        hero: z.object({
          images: z.array(createImageSchema())
        }),
        content: z.object({}),
        images: z.array(createImageSchema()),
        sphere: z.object({
          images: z.array(z.object({
            id: z.string(),
            src: z.string(),
            alt: z.string(),
            title: z.string().optional(),
            description: z.string().optional()
          })),
          containerSize: z.number().optional(),
          autoRotate: z.boolean().optional(),
          autoRotateSpeed: z.number().optional()
        }).optional(),
        about: z.object({
          title: z.string(),
          description: z.string()
        }),
        experience: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            date: z.date(),
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        })
      })
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
        author: createAuthorSchema()
      })
    }),

    // Page Headers for /projects and /writing listing pages
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'writing.yml' }
      ],
      schema: z.object({
        // Empty schema - this collection is only used for title/description metadata
      })
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
