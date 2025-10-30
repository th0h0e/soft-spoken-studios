import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  pages: true,

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@yuta-inoue-ph/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "vue-sonner/nuxt",
    "@nuxtjs/mdc",
  ],

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  colorMode: {
    storageKey: "Soft_Spoken-color-mode",
    classSuffix: "",
  },

  // Icon configuration is defined in app.config.ts

  css: ["~/assets/css/tailwind.css"],

  // Site Configuration
  app: {
    head: {
      title: "Soft Spoken Studios",
      meta: [
        { name: "description", content: "Creative communication and strategic storytelling" },
        { property: "og:title", content: "Soft Spoken Studios" },
        {
          property: "og:description",
          content: "Creative communication and strategic storytelling",
        },
        { name: "twitter:title", content: "Soft Spoken Studios" },
        {
          name: "twitter:description",
          content: "Creative communication and strategic storytelling",
        },
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  // Content Configuration
  content: {
    preview: {
      api: "https://api.nuxt.studio",
      dev: true,
      // Explicit git information for Studio integration
      gitInfo: {
        name: "soft-spoken-studios",
        owner: "th0h0e",
        url: "https://github.com/th0h0e/soft-spoken-studios",
      },
    },
    // Enable Studio editor integration
    editor: true,
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  },

  // MDC Configuration for syntax highlighting
  mdc: {
    highlight: {
      theme: {
        dark: "github-dark",
        default: "github-light",
      },
    },
  },

  // Route Rules for Nuxt Studio and ISR
  routeRules: {
    // Needed to activate preview on Nuxt Studio
    "/": { prerender: false },
    // ISR for blog pages - regenerate every hour
    "/blog": { swr: 3600 },
    "/articles/**": { swr: 3600 },
    // Static generation for other pages
    "/about": { prerender: true },
    "/work": { prerender: true },
  },

  // Experimental features following reference project
  experimental: {
    viewTransition: true,
  },

  // Components configuration
  components: [
    {
      path: '~/components',
      pathPrefix: true, // Use full path to avoid naming conflicts
    },
    // Prose components for customizing Markdown HTML rendering
    {
      path: '~/components/prose',
      global: true,
      prefix: 'Prose',
    },
  ],

  // Hooks configuration following reference project
  hooks: {
    "nitro:config": (config) => {
      // Custom configuration for content handling
      if (config.handlers) {
        config.handlers = config.handlers || [];
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
      routes: ["/"],
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

  // Enable SSR for better SEO and social media previews
  ssr: true,
});