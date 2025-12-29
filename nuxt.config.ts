export default defineNuxtConfig({

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/sss.svg' }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/hints',
    'nuxt-studio'
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
  debug: true,

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
