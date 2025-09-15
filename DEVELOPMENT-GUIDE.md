# Soft Spoken Studios - Development Guide

## Project Overview

This project is a Nuxt 3 application with Nuxt Studio integration for content management, i18n for multilingual support (English, Dutch, Swedish), and a clean content structure for easy editing.

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
- `/content/articles/*.md` - Blog posts and articles
- `/content/portfolio/*.md` - Portfolio projects
- `/content/about/*.md` - About page sections (Skills, Experience, Philosophy, Education)

**❌ NOT Editable in Studio** (Code files):
- `/i18n/locales/*.json` - Translation files
- `app.config.ts` - Site configuration
- `nuxt.config.ts` - Technical configuration

### Content Structure

#### Articles Collection
Located: `/content/articles/`
Schema includes:
- `title`, `description`, `date`
- `image` (optional URL)
- `tags[]`, `categories[]`
- `featured` (boolean)
- `excerpt` (optional)

#### Portfolio Collection
Located: `/content/portfolio/`
Schema includes:
- `title`, `description`, `date`
- `client`, `services[]`, `technologies[]`
- `projectUrl`, `githubUrl` (optional)
- `featured` (boolean)

#### About Sections Collection
Located: `/content/about/`
Four main sections:
1. **Skills** (`skills.md`) - Expertise areas with icons
2. **Experience** (`experience.md`) - Work history and client projects
3. **Philosophy** (`philosophy.md`) - Values and principles
4. **Education** (`education.md`) - Learning journey and certifications

### Using Nuxt Studio

1. **Access Studio**: Connect to your GitHub repository through Nuxt Studio
2. **Edit Content**: Navigate to content collections and edit directly
3. **Live Preview**: See changes in real-time before publishing
4. **Publish**: Changes sync back to your GitHub repository

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
    "about": "About",
    // ... menu items
  },
  "common": {
    "read_more": "Read more",
    "get_in_touch": "Get in touch",
    // ... UI elements
  },
  "contact": {
    "title": "Let's work together",
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
  <p>{{ $t('common.read_more') }}</p>
  <h1>{{ $t('navigation.about') }}</h1>
</template>
```

### URL Structure
- English: `/en/about`
- Dutch: `/nl/about`
- Swedish: `/sv/about`

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
├── content/              # Studio-editable content
│   ├── articles/         # Blog posts
│   ├── portfolio/        # Project showcases
│   └── about/           # About page sections
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

**✅ DO** keep it simple like Canvas-main:
```typescript
// CORRECT - Clean configuration
i18n: {
  locales: [
    { code: 'en', name: 'English', language: 'en-US' }  // ✅ DO
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
- ✅ `/content/articles/*.md`
- ✅ `/content/portfolio/*.md`
- ✅ `/content/about/*.md`

### Schema Definition Mistakes

**❌ DON'T** create content without defining schema first:
```typescript
// WRONG - No schema validation
export const collections = {
  articles: defineCollection({
    type: 'page',
    source: { include: 'articles/**/*.md' }
    // ❌ Missing schema!
  })
}
```

**✅ DO** always define proper schemas:
```typescript
// CORRECT - Proper schema validation
const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  // ... proper validation
})

export const collections = {
  articles: defineCollection({
    type: 'page',
    source: { include: 'articles/**/*.md' },
    schema: articleSchema  // ✅ Schema validation
  })
}
```

### Development Workflow Mistakes

**❌ DON'T** ignore console warnings:
- Vue Router warnings usually mean missing pages
- i18n warnings mean missing translation keys
- Icon warnings mean missing icon packages

**❌ DON'T** mix content management approaches:
- Don't edit content files manually AND in Studio
- Don't put translatable content in app.config.ts
- Don't put site config in translation files

**❌ DON'T** commit broken states:
- Always test all languages before committing
- Verify Studio integration works
- Check that build succeeds

### File Organization Mistakes

**❌ DON'T** put content in wrong directories:
```
// WRONG structure
/content/
  /en/articles/  // ❌ Language-first (old pattern)
  /nl/articles/
  /sv/articles/
```

**✅ DO** use content-type-first structure:
```
// CORRECT structure
/content/
  /articles/  // ✅ Content-type-first (Studio-friendly)
  /portfolio/
  /about/
```

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

*Last updated: Based on Canvas-main patterns and extensive testing*