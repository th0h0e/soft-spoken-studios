// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/hints',
    'nuxt-og-image',
    'nuxt-studio',
    '@nuxthub/core'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  site: {
    url: process.env.NUXT_SITE_URL || 'https://soft-spoken-studios.th0h0e.workers.dev',
    name: 'Soft Spoken Studios'
  },

  content: {
    // Studio alpha configuration
    // The new module handles preview automatically
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  hub: {
    database: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    development: {
      sync: true
    }
  }
})
