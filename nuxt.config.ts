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

  css: ['~/assets/css/main.css'],

  content: {
    database: {
      type: 'sqlite',
      binding: 'content'
    }
  },

  compatibilityDate: '2025-12-29',

  nitro: {
    preset: 'node_cluster'
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
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'th0h0e',
      repo: 'soft-spoken-studios',
      branch: 'main'
    }
  }
})
