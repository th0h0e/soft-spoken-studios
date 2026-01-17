export default defineNuxtConfig({
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

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/sss.svg' }]
    }
  },

  css: ['~/assets/css/main.css'],

  content: {
    database: {
      type: 'sqlite',
      binding: 'content'
    },
    build: {
      markdown: {
        highlight: false
      }
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

  icon: {
    clientBundle: {
      // Only bundle the icons you actually use
      icons: [
        // Feather icons
        'feather:chevron-left',
        'feather:chevron-right',
        'feather:chevron-down',
        'feather:calendar',
        'feather:clock',
        'feather:home',
        'feather:layout',
        'feather:pen-tool',
        'feather:users',
        'feather:image',
        'feather:search',
        'feather:x',
        'feather:check',
        'feather:loader',
        'feather:arrow-left',
        'feather:arrow-right',
        'feather:external-link',
        'feather:type',
        'feather:folder',
        'feather:sun',
        'feather:moon',
        'feather:monitor',
        'feather:check-circle',
        'feather:copy',
        'feather:plus',
        'feather:share-2',
        'feather:link',
        // Lucide icons
        'lucide:chevron-down',
        'lucide:x',
        'lucide:check-circle',
        // Simple Icons
        'simple-icons:instagram'
      ],
      // Scan your components for icons (backup)
      scan: true
    },
    // Disable server bundle to reduce server size
    serverBundle: false
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
