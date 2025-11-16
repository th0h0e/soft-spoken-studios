import { defineCollection, defineContentConfig } from '@nuxt/content'
import { indexCollectionSchema } from './schemas/index.schema'
import { projectsCollectionSchema } from './schemas/projects.schema'
import { writingCollectionSchema } from './schemas/writing.schema'
import { pagesCollectionSchema } from './schemas/pages.schema'
import { aboutCollectionSchema } from './schemas/about.schema'

/**
 * Nuxt Content Configuration
 * All schemas are now organized in separate files under /schemas
 */
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
    })
  }
})
