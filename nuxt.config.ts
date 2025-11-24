import { definePerson } from 'nuxt-schema-org/schema'
import appMeta from './app/app.meta'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/seo',
    '@nuxt/hints'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    name: appMeta.name,
    url: appMeta.url,
    description: appMeta.description
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'soft-spoken-studios',
        owner: 'th0h0e',
        url: 'https://github.com/th0h0e/soft-spoken-studios'
      }
    }
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    experimental: {
      openAPI: true
    },
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  robots: {
    allow: '/',
    disallow: ['/admin']
  },

  schemaOrg: {
    identity: definePerson(appMeta.author)
  }
})
