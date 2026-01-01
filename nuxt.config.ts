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
    database: {
      type: 'sqlite',
      binding: 'content'
    }
  },

  compatibilityDate: '2025-12-29',

  nitro: {
    preset: 'node-server'
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
