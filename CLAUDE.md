# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Soft Spoken Studios** - A minimalist creative communication agency website specializing in copywriting and video production.

### Brand Guidelines
- **Company**: Soft Spoken Studios
- **Tagline**: "We can write your talk, and capture your walk"
- **Style**: Minimal, authentic, document-like (not flashy website)
- **Colors**: Black, white, very light pink/yellow only - stick to neutral theme variables
- **Typography**: Black Times New Roman, text-only navigation
- **Approach**: Quality over noise, thoughtful communication, local business focus

**AVOID**: Corporate buzzwords, startup language, loud colors, flashy animations, emojis in code/copy

## 🚨 CRITICAL: Nuxt 4 Implementation Rules

### ⚠️ NEVER USE definePageMeta()
**This causes compilation errors in Nuxt 4!**

❌ **DON'T:**
```vue
<script setup>
definePageMeta({ title: "Page Title" })
</script>
```

✅ **DO:**
```vue
<script setup>
useHead({ title: "Page Title" })
</script>
```

### Nuxt Content - Use Direct Queries Only

❌ **DON'T create custom composables:**
```vue
const { getAllBlogPosts } = useBlog() // Causes import issues
```

✅ **DO use direct queries:**
```vue
<script setup>
// For listing pages
const { data: articles } = await useAsyncData('articles', async () => {
  return await queryCollection('articles').all()
})

// For detail pages
const { data: page } = await useAsyncData(path.value, async () =>
  await queryCollection('articles').path(path.value).first()
)
</script>
```

### CSS Classes & Content Styling

❌ **AVOID these approaches:**
- Complex custom CSS classes that may not exist: `text-foreground`, `text-muted-foreground`, `text-gray-900`
- Custom CSS components for ContentRenderer styling (causes compilation errors)
- Direct method calls in templates: `array.slice(0, 2)` (use helper functions instead)

✅ **USE these approaches:**
- **Standard Tailwind classes**: `text-muted`, `text-primary`, `text-base`, `leading-relaxed`, `space-y-6`
- **ContentRenderer default styling**: Let Nuxt Content handle content rendering
- **Ui components**: Always prefer existing `@app/components/Ui/` components
- **Helper functions**: Move complex operations from templates to script section

#### Content Styling Best Practices:
```vue
<!-- ✅ CORRECT: Simple, reliable styling -->
<article class="mb-12 text-base leading-relaxed space-y-6">
  <ContentRenderer :value="page" />
</article>

<!-- ❌ WRONG: Complex custom CSS -->
<article class="prose prose-neutral dark:prose-invert max-w-none">
  <ArticleContent :content="page" />
</article>
```

#### Template Method Calls:
```vue
<!-- ❌ WRONG: Direct method calls -->
<span v-for="item in items.slice(0, 2)">{{ item }}</span>

<!-- ✅ CORRECT: Helper function -->
<span v-for="item in getFirstTwo(items)">{{ item }}</span>
```

## Internationalization (i18n)

### Configuration
- **Strategy**: `'prefix'` - All routes include locale prefix
- **Default Locale**: `'en'` (English)
- **Supported Locales**: English (`en`), Dutch (`nl`), Swedish (`sv`)

### URL Structure
```
/en/        # English home
/nl/        # Dutch home
/sv/        # Swedish home
/en/about   # English about page
/nl/about   # Dutch about page
/sv/about   # Swedish about page
```

### Navigation Best Practices
- Always use `localePath()` for navigation links
- Use `useLocalePath()` composable in components
- Language switching handled by `useSwitchLocalePath()`

## Content System

### Structure (Language-First - REQUIRED)
```
content/
├── en/                # English content
│   ├── articles/      # English blog posts
│   ├── portfolio/     # English portfolio projects
│   ├── about/         # English about sections
│   └── *.md          # English main pages (index, about, work, blog, gallery)
├── nl/                # Dutch content (same structure)
└── sv/                # Swedish content (same structure)
```

### Adding Content
1. Create `.md` file in appropriate language folder
2. Add frontmatter with required fields
3. Automatic routing: `/en/articles/filename`, `/nl/articles/filename`, `/sv/articles/filename`

### Required Dependencies
- `@nuxt/content` - Content management
- `better-sqlite3` - Required by Nuxt Content

## Key Project Rules

1. **Content-driven routing** - Uses catch-all `[...slug].vue` pattern
2. **Language-first content structure** - ALL content organized by locale first
3. **Never use definePageMeta()** - use `useHead()` instead
4. **Direct content queries** - no custom composables, use locale-specific collections
5. **Minimal styling** - avoid complex CSS classes
6. **Always use localePath()** - for all navigation links

## File Structure
```
app/
├── pages/
│   └── [...slug].vue  # Catch-all route for content-driven routing
├── components/         # Auto-imported Vue components
├── layouts/           # Layout templates
├── utils/             # Navigation utilities (useNavigation.ts)
└── composables/       # Reusable logic

content/               # Language-first content structure
├── en/                # English content
│   ├── articles/      # English blog posts
│   ├── portfolio/     # English portfolio
│   ├── about/         # English about sections
│   └── *.md          # English main pages
├── nl/                # Dutch content (same structure)
└── sv/                # Swedish content (same structure)

content.config.ts      # Locale-specific content collections
```

## Development Commands
```bash
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview build
```

This covers the essential project-specific guidance without generic Nuxt documentation.