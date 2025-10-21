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
  definePageMeta({ title: "Page Title" });
</script>
```

✅ **DO:**

```vue
<script setup>
  useHead({ title: "Page Title" });
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
  const { data: articles } = await useAsyncData("articles", async () => {
    return await queryCollection("articles").all();
  });

  // For detail pages
  const { data: page } = await useAsyncData(
    path.value,
    async () => await queryCollection("articles").path(path.value).first()
  );
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
<article class="mb-12 space-y-6 text-base leading-relaxed">
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

## Content System

### Structure

```
content/
├── articles/      # Blog posts
├── portfolio/     # Portfolio projects
├── about/         # About sections
└── *.md          # Main pages (index, about, work, blog, gallery)
```

### Adding Content

1. Create `.md` file in appropriate folder
2. Add frontmatter with required fields
3. Automatic routing: `/articles/filename`, `/portfolio/filename`

### Required Dependencies

- `@nuxt/content` - Content management
- `better-sqlite3` - Required by Nuxt Content

## Key Project Rules

1. **Content-driven routing** - Uses catch-all `[...slug].vue` pattern
2. **Never use definePageMeta()** - use `useHead()` instead
3. **Direct content queries** - no custom composables, use direct collection queries
4. **Minimal styling** - avoid complex CSS classes
5. **Navigation simplicity** - hardcoded navigation links
6. **Custom UI components** - prioritize custom Ui components over external frameworks
7. **English only** - Site is English-only, no internationalization

## File Structure (Nuxt 4 Standard)

This project follows the Nuxt 4 directory structure with `app/` as the default `srcDir`.

```
📁 Project Root/
├── app/                    # srcDir - All application code (Nuxt 4 default)
│   ├── assets/             # Processed assets (CSS, images)
│   ├── components/         # Auto-imported Vue components
│   │   ├── Ui/            # Custom UI component library (83+ components)
│   │   └── *.vue          # App-specific components
│   ├── composables/        # Auto-imported composables
│   │   ├── useContactForm.ts
│   │   ├── useFormField.ts
│   │   └── useCarousel.ts
│   ├── layouts/            # Layout templates
│   │   └── default.vue     # Main layout with sidebar
│   ├── pages/              # File-based routing
│   │   ├── [...slug].vue   # Catch-all for content-driven routing
│   │   ├── index.vue       # Home page
│   │   ├── about.vue       # About page
│   │   ├── blog.vue        # Blog listing
│   │   ├── work.vue        # Portfolio listing
│   │   └── gallery.vue     # Gallery page
│   ├── utils/              # Auto-imported utility functions
│   ├── app.config.ts       # App configuration (Nuxt 4: inside srcDir)
│   └── app.vue             # Root Vue component
├── content/                # Nuxt Content files (root level)
│   ├── articles/           # Blog posts
│   ├── portfolio/          # Portfolio projects
│   ├── about/              # About page sections
│   └── *.md               # Main pages (index, about, work, blog, gallery)
├── server/                 # Server-side code (Nitro - root level)
│   ├── api/                # API endpoints
│   ├── routes/             # Server routes
│   └── emails/             # Email utilities
├── shared/                 # Shared code (client + server - NEW in Nuxt 4)
│   ├── utils/              # Shared utilities (use #shared alias)
│   ├── types/              # Shared TypeScript types
│   └── constants/          # Shared constants
├── public/                 # Static assets (served at root URL)
├── content.config.ts       # Content collections configuration
├── nuxt.config.ts          # Nuxt configuration
├── .nuxtignore             # Files to exclude from Nuxt processing
└── .gitignore              # Git ignore rules
```

### Key Nuxt 4 Changes

1. **`srcDir` = `app/`**: All Vue code lives in `app/` directory (Nuxt 4 default)
2. **`app.config.ts` moved**: Now inside `app/` directory instead of root
3. **`shared/` directory**: New in Nuxt 4 for code shared between client/server
4. **No root `plugins/`**: Plugins should be in `app/plugins/` if needed
5. **No `app/middleware/`**: Removed (not currently used in this project)

### Import Aliases

- `~/` or `@/` → `app/` directory
- `#shared` → `shared/` directory
- `#app` → Nuxt internal
- `#imports` → Auto-imports

## Development Commands

```bash
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview build
```

This covers the essential project-specific guidance without generic Nuxt documentation.
