// https://nuxt.com/docs/api/configuration/nuxt-config
// Nuxt Hub enabled with NuxtHub database for data persistence
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/hints',
    'nuxt-studio',
    '@nuxthub/core'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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
    // Studio admin login route
    route: '/_studio',

    // Git repository configuration (required for production)
    repository: {
      provider: 'github',
      owner: 'th0h0e',
      repo: 'soft-spoken-studios',
      branch: 'main',
      rootDir: ''
    },

    development: {
      sync: true
    }
  }
})
