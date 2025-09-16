# Soft Spoken Studios - Development Guide

## Project Overview

This project is a Nuxt 4.x application with Nuxt Studio integration for content management, i18n for multilingual support (English, Dutch, Swedish), and a clean content structure for easy editing.

## MCP

mcp**nuxt**get-nuxt-config - Get the Nuxt configuration
mcp**nuxt**get-vite-config - Get the Vite config digest
mcp**nuxt**get-vite-module-info - Get graph information of a module
mcp**nuxt**list-nuxt-auto-imports-items - List auto-imports items
mcp**nuxt**list-nuxt-components - List registered components
mcp**nuxt**list-nuxt-pages - List registered pages
mcp**nuxt**nuxt-scaffold - Scaffold new components/pages/layouts
mcp**nuxt-docs**search_nuxt_docs - Search Nuxt documentation
mcp**nuxt-docs**list_nuxt_modules - List Nuxt modules

## 🛠 Development Setup

### Starting Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Linting & Type Checking

```bash
npm run lint
npm run typecheck
```

---

## 📝 Content Management with Nuxt Studio

### What is Editable in Nuxt Studio

**✅ Content Files** (Managed through Studio):

- `/content/{locale}/articles/*.md` - Blog posts and articles per language
- `/content/{locale}/portfolio/*.md` - Portfolio projects per language
- `/content/{locale}/about/*.md` - About page sections per language
- `/content/{locale}/*.md` - Main page content per language

**❌ NOT Editable in Studio** (Code files):

- `/i18n/locales/*.json` - Translation files
- `app.config.ts` - Site configuration
- `nuxt.config.ts` - Technical configuration

### Content Structure

**🚨 CRITICAL: Language-First Directory Structure**

All content **MUST** be organized by language first, then by content type. This structure is required for proper i18n routing integration.

#### Content Collections

**Main Pages** (Located: `/content/{locale}/`)
Each language directory contains:

- `index.md` - Home page content
- `about.md` - About page content
- `work.md` - Work/Portfolio listing page
- `blog.md` - Blog listing page
- `gallery.md` - Gallery page content

**Articles Collection** (Located: `/content/{locale}/articles/`)
Schema includes:

- `title`, `preview`, `date`
- `heroImage`, `heroImageDescription`
- `contentImage`, `contentImageDescription`
- `paragraphOne`, `paragraphTwo`
- `sources[]` (optional), `tags[]` (optional)
- `featured` (boolean, optional)

**Portfolio Collection** (Located: `/content/{locale}/portfolio/`)
Schema includes:

- `title`, `description`, `date`
- `image` (optional), `client` (optional)
- `featured` (boolean, optional)

**About Content** (Located: `/content/{locale}/about.md`)
Main about page content per language with comprehensive sections including skills, experience, philosophy, and education integrated into a single page.

### Using Nuxt Studio

1. **Access Studio**: Connect to your GitHub repository through Nuxt Studio
2. **Edit Content**: Navigate to content collections and edit directly
3. **Live Preview**: See changes in real-time before publishing
4. **Publish**: Changes sync back to your GitHub repository

---

## 🆕 Nuxt i18n v10 New Features

### Content-Driven Routing vs Custom Page Routes

**Our Project Uses**: Content-driven routing with catch-all `[...slug].vue` pattern

- ✅ No need for `definePageMeta()` route customization
- ✅ Routes automatically generated from content structure
- ✅ All routing handled through content collections

**Alternative Approach** (not used in this project):
If using traditional Vue pages, v10 now supports custom routes via `definePageMeta()`:

```vue
<script setup>
  definePageMeta({
    i18n: {
      paths: {
        en: "/about-us",
        nl: "/over-ons",
        sv: "/om-oss",
      },
    },
  });
</script>
```

### Nitro-Side Language Detection (Active)

Language detection now happens server-side for better performance:

- ✅ Improves prerendering compatibility
- ✅ Earlier request lifecycle redirection
- ⚙️ Can be disabled with `experimental.nitroContextDetection: false` if needed

### Experimental Features Available

**Strict SEO Mode** (`experimental.strictSeo: true`):

- Automatic i18n head tag management
- Disabled alternate tags for unsupported locales
- Global canonical query parameter configuration
- No need for manual `useLocaleHead()` calls

**Note**: We use standard SEO mode for maximum compatibility.

---

## 🌍 Internationalization (i18n)

### Supported Languages

- English (`en`) - Default
- Dutch (`nl`)
- Swedish (`sv`)

### Translation File Structure

**Location**: `/i18n/locales/`

- `en.json` - English translations
- `nl.json` - Dutch translations
- `sv.json` - Swedish translations
- `messages.ts` - Import manager (auto-loads translations)

### Translation Categories

```json
{
  "navigation": {
    "home": "Home",
    "about": "About"
    // ... menu items
  },
  "common": {
    "read_more": "Read more",
    "get_in_touch": "Get in touch"
    // ... UI elements
  },
  "contact": {
    "title": "Let's work together"
    // ... contact form content
  }
}
```

### What Should vs Shouldn't Be Translated

**✅ Translate**:

- Navigation menu items
- Button labels and UI text
- Form labels and messages
- User-facing content

**❌ Don't Translate**:

- Site name: "Soft Spoken Studios"
- Company contact information
- Technical configuration
- URLs and file paths

### Using Translations in Components

```vue
<template>
  <p>{{ $t("common.read_more") }}</p>
  <h1>{{ $t("navigation.about") }}</h1>
</template>
```

### URL Structure

- English: `/about` (no prefix for default locale)
- Dutch: `/nl/about`
- Swedish: `/sv/about`
- Homepage: `/` (English), `/nl` (Dutch), `/sv` (Swedish)

---

## ⚠️ Potential API Issues & Vue Compiler Requirements

### Vue Compiler Syntax Requirements

**🚨 CRITICAL**: Nuxt 4.x Vue compiler has strict syntax requirements that must be followed:

#### Template Literals Must Use Backticks

```typescript
// ❌ WRONG - Will cause compiler errors
const key = `articles-${locale.value}`
const collection = articles_${locale.value} as keyof Collections

// ✅ CORRECT - Proper template literal syntax
const key = `articles-${locale.value}`
const collection = `articles_${locale.value}` as keyof Collections
```

#### Semicolons Required in useAsyncData Callbacks

```typescript
// ❌ WRONG - Missing semicolons cause compiler errors
const { data: articles } = await useAsyncData(`articles-${locale.value}`, async () => {
  const collection = `articles_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
});

// ✅ CORRECT - All statements must end with semicolons
const { data: articles } = await useAsyncData(`articles-${locale.value}`, async () => {
  const collection = `articles_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
});
```

#### Complete Syntax Pattern for Content Queries

```typescript
// ✅ CORRECT - Full pattern with proper syntax
<script setup>
const { locale } = useI18n()

// Get articles for current locale
const { data: articles } = await useAsyncData(`articles-${locale.value}`, async () => {
  const collection = `articles_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
})

// Get single page content
const { data: page } = await useAsyncData(`page-${locale.value}`, async () => {
  const collection = `content_${locale.value}` as keyof Collections;
  return await queryCollection(collection).path(`/${locale.value}`).first();
})
</script>
```

### Content API Migration Notes

The project uses the **modern** `queryCollection()` API, not the deprecated `queryContent()` API:

```typescript
// ❌ OLD API (deprecated)
const articles = await queryContent("/articles").find();
const page = await queryContent("/about").findOne();

// ✅ CURRENT API (what we use)
const articles = await queryCollection("articles_en").all();
const page = await queryCollection("content_en").path("/en").first();
```

---

## 🧭 Navigation Utility System

### Navigation Structure

The project uses a centralized navigation utility located at `/app/utils/useNavigation.ts`:

```typescript
// Navigation type definition
export type Navigation = {
  name: string;
  to: string;
  icon: string;
};

// Navigation utility function
export function getNavigation(where: Where): Record<string, Navigation> | [] {
  switch (where) {
    case "home":
      return {
        home: { name: "Home", to: "/", icon: "lucide:home" },
        about: { name: "About", to: "/about", icon: "lucide:user" },
        work: { name: "Work", to: "/work", icon: "lucide:briefcase" },
        blog: { name: "Blog", to: "/blog", icon: "lucide:library" },
        gallery: { name: "Gallery", to: "/gallery", icon: "lucide:image" },
      };
    default:
      return [];
  }
}
```

### Using Navigation in Components

**In Layouts** (`app/layouts/default.vue`):

```typescript
<script setup>
// Get navigation data
const navigationData = getNavigation('home')
const navigation = computed(() => {
  if (Array.isArray(navigationData)) return []
  return Object.values(navigationData)
})
</script>

<template>
  <nav>
    <NuxtLink
      v-for="item in navigation"
      :key="item.name"
      :to="localePath(item.to)"
    >
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>
```

**Key Navigation Patterns:**

- Always use `localePath(item.to)` for i18n-aware routing
- Navigation items include icon classes for UI consistency
- Type-safe with TypeScript definitions
- Centralized for easy maintenance

---

## 🔌 Nuxt i18n API Extensions

### NuxtApp Context Extensions

The i18n module extends the Nuxt runtime app context with global APIs:

#### `$i18n` Global Instance

Available on NuxtApp context - provides access to Vue I18n Composer or VueI18n instance:

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  // Access global i18n instance
  nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, nuxtApp) => {
    console.log("onBeforeLanguageSwitch", oldLocale, newLocale, isInitialSetup);
  };
});
```

**Note**: Since we use `legacy: false` (Composition API), `$i18n` is a global Composer instance.

#### Available Context Methods

- `$routeBaseName()` - Get route base name without locale suffix
- `$switchLocalePath()` - Generate path for locale switching
- `$localePath()` - Generate localized path
- `$localeRoute()` - Generate localized route object
- `$localeHead()` - Generate localized head metadata

### Nuxt Hooks Extensions

#### `i18n:registerModule` Hook

For module authors to register additional translation resources:

```typescript
import { createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.hook("i18n:registerModule", (register) => {
      register({
        // langDir path needs to be resolved
        langDir: resolve("./lang"),
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "nl",
            file: "nl.json",
          },
          {
            code: "sv",
            file: "sv.json",
          },
        ],
      });
    });
  },
});
```

**Usage in Our Project**: We don't currently use module registration, but this hook is available for extending translations from custom modules.

---

## 🔧 Configuration Files

### Key Configuration Files

#### `nuxt.config.ts`

- i18n module configuration
- Nuxt Studio preview settings
- Icon collections
- Build and runtime settings

#### `content.config.ts`

- Content collection schemas
- Zod validation for content types
- Defines what fields are available in Studio

#### `app.config.ts`

- Site identity (name, tagline, description)
- Contact information
- Business information
- SEO settings

### i18n Configuration Pattern

```typescript
// Current project configuration in nuxt.config.ts
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
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieSecure: false,
    fallbackLocale: ''
  },
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  experimental: {
    localeDetector: '',
    typedPages: true,
    typedOptionsAndMessages: false,
    alternateLinkCanonicalQueries: true,
    devCache: false,
    stripMessagesPayload: false,
    preload: false,
    strictSeo: false,
    nitroContextDetection: true
  }
}
```

**Important**: Don't add `langDir` or `file` properties - translations are loaded via plugin.

---

## 🚨 Common Issues & Solutions

### Translation Keys Showing as Literal Text

**Problem**: Seeing `global.tagline` instead of actual text
**Solution**:

1. Ensure translations exist in all language files
2. Check that the i18n plugin is loading (`plugins/i18n.client.ts`)
3. Use correct key paths (`common.tagline` not `global.tagline`)

### Vue Router Warnings

**Problem**: "No match found for location" warnings
**Solution**: Ensure all pages exist and routes are properly configured

### Icon Collection Missing

**Problem**: Icon warnings in console
**Solution**: Install missing icon collection:

```bash
npm i -D @iconify-json/[collection-name]
```

### Content Not Appearing in Studio

**Problem**: Content files not visible in Nuxt Studio
**Solution**:

1. Check `content.config.ts` has correct collection definition
2. Ensure files are in correct directory structure
3. Verify schema matches file frontmatter

---

## 📁 Project Structure

```
/
├── app/
│   ├── components/        # Vue components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   └── assets/           # Static assets
├── content/              # Studio-editable content (LANGUAGE-FIRST)
│   ├── en/              # English content
│   │   ├── articles/    # English blog posts
│   │   ├── portfolio/   # English project showcases
│   │   ├── about/       # English about sections
│   │   ├── index.md     # English home page
│   │   ├── about.md     # English about page
│   │   ├── work.md      # English work page
│   │   ├── blog.md      # English blog page
│   │   └── gallery.md   # English gallery page
│   ├── nl/              # Dutch content (same structure)
│   └── sv/              # Swedish content (same structure)
├── i18n/
│   └── locales/         # Translation files
├── plugins/             # Nuxt plugins
├── app.config.ts        # App configuration
├── content.config.ts    # Content schemas
└── nuxt.config.ts       # Nuxt configuration
```

---

## ❌ Common Mistakes to Avoid

### i18n Configuration Mistakes

**❌ DON'T** add direct message loading in `nuxt.config.ts`:

```typescript
// WRONG - This causes path duplication errors
i18n: {
  locales: [
    { code: 'en', name: 'English', file: 'en.json' }  // ❌ DON'T
  ],
  langDir: 'i18n/locales/',  // ❌ DON'T
  messages: {
    en: require('./i18n/locales/en.json')  // ❌ DON'T
  }
}
```

**✅ DO** keep it simple like our project:

```typescript
// CORRECT - Our clean configuration
i18n: {
  locales: [
    { code: 'en', name: 'English', language: 'en-US' },
    { code: 'nl', name: 'Nederlands', language: 'nl-NL' },
    { code: 'sv', name: 'Svenska', language: 'sv-SE' }
  ],
  strategy: 'prefix',
  defaultLocale: 'en'
}
```

### Translation Key Mistakes

**❌ DON'T** put site identity in translations:

```json
// WRONG - These should be in app.config.ts
"global": {
  "site_name": "Soft Spoken Studios",  // ❌ DON'T
  "tagline": "Creative Communication Agency"  // ❌ DON'T
}
```

**✅ DO** only translate user-facing content:

```json
// CORRECT - Only UI elements that change per language
"common": {
  "read_more": "Read more",  // ✅ DO
  "get_in_touch": "Get in touch"  // ✅ DO
}
```

### Content Structure Mistakes

**❌ DON'T** try to edit config files in Studio:

- ❌ `nuxt.config.ts`
- ❌ `app.config.ts`
- ❌ `i18n/locales/*.json`
- ❌ `plugins/*.ts`

**✅ DO** only edit content files in Studio:

- ✅ `/content/{locale}/articles/*.md`
- ✅ `/content/{locale}/portfolio/*.md`
- ✅ `/content/{locale}/about/*.md`
- ✅ `/content/{locale}/*.md` (main pages)

### Schema Definition Mistakes

**❌ DON'T** create content without defining schema first:

```typescript
// WRONG - No schema validation (old pattern)
export const collections = {
  articles: defineCollection({
    type: "page",
    source: { include: "articles/**/*.md" }, // ❌ Wrong structure!
    // ❌ Missing schema!
  }),
};
```

**✅ DO** always define proper schemas:

```typescript
// CORRECT - Our actual collection definitions from content.config.ts
export const collections = {
  // Content collections (main pages)
  content_en: defineCollection({
    type: "page",
    source: {
      include: "en/*.md",
      prefix: "/en",
    },
  }),
  content_nl: defineCollection({
    type: "page",
    source: {
      include: "nl/*.md",
      prefix: "/nl",
    },
  }),
  content_sv: defineCollection({
    type: "page",
    source: {
      include: "sv/*.md",
      prefix: "/sv",
    },
  }),

  // Article collections
  articles_en: defineCollection({
    type: "page",
    source: {
      include: "en/articles/*.md",
      prefix: "/en/articles",
    },
  }),
  articles_nl: defineCollection({
    type: "page",
    source: {
      include: "nl/articles/*.md",
      prefix: "/nl/articles",
    },
  }),
  articles_sv: defineCollection({
    type: "page",
    source: {
      include: "sv/articles/*.md",
      prefix: "/sv/articles",
    },
  }),

  // Portfolio collections
  portfolio_en: defineCollection({
    type: "page",
    source: {
      include: "en/portfolio/*.md",
      prefix: "/en/portfolio",
    },
  }),
  portfolio_nl: defineCollection({
    type: "page",
    source: {
      include: "nl/portfolio/*.md",
      prefix: "/nl/portfolio",
    },
  }),
  portfolio_sv: defineCollection({
    type: "page",
    source: {
      include: "sv/portfolio/*.md",
      prefix: "/sv/portfolio",
    },
  }),
};
```

### Development Workflow Mistakes

**❌ DON'T** ignore console warnings:

- Vue Router warnings usually mean missing pages
- i18n warnings mean missing translation keys
- Icon warnings mean missing icon packages

### Vue Compiler Syntax Mistakes

**❌ DON'T** use incorrect template literal syntax:

```typescript
// WRONG - Missing backticks will cause compilation errors
const collection = articles_${locale.value} as keyof Collections
const key = home-${locale.value}

// WRONG - Missing semicolons in async callbacks
const { data } = await useAsyncData(key, async () => {
  return await queryCollection(collection).all()  // ❌ Missing semicolon
})
```

**✅ DO** use proper syntax consistently:

```typescript
// CORRECT - All template literals use backticks and semicolons
const collection = `articles_${locale.value}` as keyof Collections;
const key = `home-${locale.value}`;

const { data } = await useAsyncData(key, async () => {
  return await queryCollection(collection).all(); // ✅ Proper semicolon
});
```

**❌ DON'T** mix content management approaches:

- Don't edit content files manually AND in Studio
- Don't put translatable content in app.config.ts
- Don't put site config in translation files

**❌ DON'T** commit broken states:

- Always test all languages before committing
- Verify Studio integration works
- Check that build succeeds

### File Organization Requirements

**🚨 CRITICAL: Use Language-First Structure**

This project **REQUIRES** a language-first directory structure to properly integrate with i18n routing. This is **NOT OPTIONAL**.

**✅ REQUIRED structure:**

```
/content/
  /en/              # English content
    /articles/      # English articles
    /portfolio/     # English portfolio
    /about/         # English about sections
    index.md        # English home page
    about.md        # English about page
    work.md         # English work page
    blog.md         # English blog page
    gallery.md      # English gallery page
  /nl/              # Dutch content (same structure)
    /articles/      # Dutch articles
    /portfolio/     # Dutch portfolio
    /about/         # Dutch about sections
    index.md        # Dutch home page
    about.md        # Dutch about page
    work.md         # Dutch work page
    blog.md         # Dutch blog page
    gallery.md      # Dutch gallery page
  /sv/              # Swedish content (same structure)
    /articles/      # Swedish articles
    /portfolio/     # Swedish portfolio
    /about/         # Swedish about sections
    index.md        # Swedish home page
    about.md        # Swedish about page
    work.md         # Swedish work page
    blog.md         # Swedish blog page
    gallery.md      # Swedish gallery page
```

**❌ NEVER use content-type-first structure:**

```
// WRONG - This breaks i18n routing
/content/
  /articles/      # ❌ Content-type-first breaks localization
  /portfolio/     # ❌ Cannot route to /en/articles/
  /about/         # ❌ Causes routing conflicts
```

**Why Language-First is Required:**

- Matches i18n URL structure (`/en/articles/`, `/nl/articles/`)
- Enables proper locale-specific content management
- Required by content.config.ts collections configuration
- Prevents routing conflicts with Nuxt i18n module

---

## 🎯 Best Practices

### Content Management

1. **Use Studio for content** - Edit articles, portfolio, and about sections through Studio
2. **Keep translations in code** - UI translations stay in JSON files
3. **Maintain schema consistency** - Always update `content.config.ts` when adding new content fields

### Development Workflow

1. **Start with content structure** - Define schemas before creating content
2. **Test in all languages** - Verify translations work across all locales
3. **Use type-safe content** - Leverage Zod schemas for content validation

### Internationalization

1. **Consistent key naming** - Use clear, hierarchical translation keys
2. **Cultural adaptation** - Consider cultural differences, not just language
3. **Fallback content** - Always have English as fallback

---

## 🔍 Debugging

### Check Translation Loading

```bash
# In browser console
console.log($nuxt.$i18n.messages)
# Or access available locales
console.log($nuxt.$i18n.availableLocales)
# Or current locale
console.log($nuxt.$i18n.locale.value)
```

### Verify Content Schema

```bash
# Check if content validates
npm run dev
# Look for schema validation errors in console
```

### Studio Connection Issues

1. Verify GitHub repository connection
2. Check preview API configuration in `nuxt.config.ts`
3. Ensure content directory structure matches collections

---

## 📚 Reference Links

- [Nuxt Content Documentation](https://content.nuxt.com/)
- [Nuxt i18n Documentation](https://i18n.nuxtjs.org/)
- [Nuxt Studio Documentation](https://nuxt.studio/)
- [Zod Schema Validation](https://zod.dev/)

---

## 🎉 Success Checklist

✅ Development server starts without warnings
✅ All languages render correctly
✅ Content editable in Nuxt Studio
✅ Translation keys resolve properly
✅ Icons load without console errors
✅ Content validates against schemas

---

_Last updated: Based on Soft Spoken Studios project architecture and Nuxt i18n v10_
