import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  pages: true,

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode",
    'nuxt-zod-i18n',
    "@nuxtjs/i18n",
    "motion-v/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@yuta-inoue-ph/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "vue-sonner/nuxt",
  ],

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner",
    }],
  },


  colorMode: {
    storageKey: "Soft_Spoken-color-mode",
    classSuffix: "",
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 0,
    },

    mode: "svg",
    class: "shrink-0",
    fetchTimeout: 2000,
    serverBundle: "local",
  },

  css: ["~/assets/css/tailwind.css"],

  // Site Configuration
  app: {
    head: {
      title: 'Soft Spoken Studios',
      meta: [
        { name: 'description', content: 'Creative communication and strategic storytelling' },
        { property: 'og:title', content: 'Soft Spoken Studios' },
        { property: 'og:description', content: 'Creative communication and strategic storytelling' },
        { name: 'twitter:title', content: 'Soft Spoken Studios' },
        { name: 'twitter:description', content: 'Creative communication and strategic storytelling' }
      ],
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
        defer: true,
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
        defer: true,
      }],
    },
  },

  // Content Configuration
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
      // Explicit git information for Studio integration
      gitInfo: {
        name: 'soft-spoken-studios',
        owner: 'th0h0e',
        url: 'https://github.com/th0h0e/soft-spoken-studios'
      }
    },
    // Enable Studio editor integration
    editor: true,
    markdown: {
      remarkPlugins: [],
      rehypePlugins: []
    }
  },

  // MDC Configuration for syntax highlighting
  mdc: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-light',
      },
    },
  },

  // Internationalization Configuration
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'nl', name: 'Nederlands', language: 'nl-NL' },
      { code: 'sv', name: 'Svenska', language: 'sv-SE' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    strategy: 'prefix',
    defaultLocale: 'en',
  },

  // Route Rules for Nuxt Studio
  routeRules: {
    // Needed to activate preview on Nuxt Studio
    '/': { prerender: false },
  },

  // Experimental features following reference project
  experimental: {
    viewTransition: true,
  },

  // Hooks configuration following reference project
  hooks: {
    'nitro:config': (config) => {
      // Custom configuration for content handling
      if (config.handlers) {
        config.handlers = config.handlers || []
      }
    },
  },

  // Nitro configuration for Studio compatibility
  nitro: {
    experimental: {
      websocket: true,
    },
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/en', '/nl', '/sv'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        cachedChecks: false,
      },
    },
    optimizeDeps: {
      force: true,
    },
    build: {
      cache: false,
    },
  },

  // Disable Nuxt caching for development
  ssr: false,
  devServer: {
    loadingTemplate: false,
  },
});