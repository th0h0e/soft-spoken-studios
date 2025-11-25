import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import { z } from 'zod'

/**
 * Button/Link schema
 * Used for CTAs, navigation links, etc.
 */
const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

/**
 * Image schema
 * Used for all image fields across collections
 */
const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

/**
 * Testimonial schema
 * Used in the index/homepage collection
 */
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

/**
 * Author schema for blog posts
 * Used specifically in writing/blog collection
 */
const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

// ============================================================================
// COLLECTION SCHEMAS
// ============================================================================

/**
 * Homepage/Index collection schema
 * Contains all sections for the landing page
 */
const indexCollectionSchema = z.object({
  // Testimonials section
  testimonials: z.array(createTestimonialSchema()),

  // Writing/Blog section heading
  writing: z.object({
    title: z.string(),
    description: z.string()
  }),

  // FAQ section
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
  })
})

const projectsCollectionSchema = z.object({
  image: z.string().nonempty().editor({ input: 'media' }),

  tags: z.array(z.string()),

  date: z.date(),

  client: z.string().optional(),

  role: z.string().optional(),

  year: z.string().optional(),

  gallery: z.array(z.string()).optional()

})

/**
 * Writing/Blog collection schema
 * Defines structure for individual blog posts
 */
const writingCollectionSchema = z.object({
  // Title of the post
  title: z.string(),

  // Description/summary of the post
  description: z.string(),

  // Estimated reading time in minutes
  minRead: z.number(),

  // Publication date
  date: z.date(),

  // Featured image
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string()
  }),

  // Post author
  author: createAuthorSchema()
})

/**
 * Pages collection schema
 * Used for general pages like projects.yml and writing.yml
 * Defines navigation links and CTAs
 */
const pagesCollectionSchema = z.object({
  // Array of button/link elements
  links: z.array(createButtonSchema())
})

/**
 * About page collection schema
 * Defines structure for the about page content
 */
const aboutCollectionSchema = z.object({
  // Hero section
  hero: z.object({
    links: z.array(createButtonSchema()),
    images: z.array(createImageSchema())
  }),

  // Content object (can be extended later with specific fields)
  content: z.object({}),

  // Images for the about page
  images: z.array(createImageSchema()),

  // Sphere component images
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

  // About section heading
  about: z.object({
    title: z.string(),
    description: z.string()
  }),

  // Experience/Work history section
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

/**
 * Letter collection schema
 * Used for the Letter component with header, title, subtitle, and paragraphs
 */
const letterCollectionSchema = z.object({
  headerText: z.string(),
  title: z.string(),
  subtitle: z.string(),
  paragraphs: z.array(z.object({
    text: z.string(),
    italic: z.boolean()
  }))
})

/**
 * TwoImages collection schema
 * Used for the TwoImages component displaying 2 images in a responsive grid
 *
 * Note: The component expects page.images.image1 and page.images.image2,
 * but the YAML currently has a different structure. You may need to update
 * either the component or the YAML to match.
 */
const twoImagesCollectionSchema = z.object({
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

/**
 * Gallery collection schema
 * Used for the gallery page displaying images with quotes
 */
const galleryCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(z.object({
    image: z.string().editor({ input: 'media' }),
    caption: z.string(),
    quote: z.string()
  }))
})

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
const bookCollectionSchema = z.object({
  author: z.string(),
  title: z.string(),
  subtitle: z.string(),
  postscript: z.array(z.string()),
  editor: z.string()
})

// ============================================================================
// CONTENT CONFIGURATION
// ============================================================================

export default defineContentConfig({
  collections: {
    // Homepage/Landing page collection
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: indexCollectionSchema
    }),

    // Projects/Portfolio collection
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: projectsCollectionSchema
    }),

    // Writing/Blog collection
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: writingCollectionSchema
    }),

    // General pages collection (projects.yml, writing.yml)
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'writing.yml' }
      ],
      schema: pagesCollectionSchema
    }),

    // About page collection
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: aboutCollectionSchema
    }),

    // Letter collection
    letter: defineCollection({
      type: 'page',
      source: 'letter.yml',
      schema: letterCollectionSchema
    }),

    // TwoImages collection
    twoimages: defineCollection({
      type: 'page',
      source: 'TwoImages.yml',
      schema: twoImagesCollectionSchema
    }),

    // Gallery collection
    gallery: defineCollection({
      type: 'page',
      source: 'gallery.yml',
      schema: galleryCollectionSchema
    }),

    // Book cover collection
    book: defineCollection({
      type: 'page',
      source: 'book.yml',
      schema: bookCollectionSchema
    })
  }
})
