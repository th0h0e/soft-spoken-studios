# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 application for Soft Spoken Studios, a creative agency website built with a custom UI component library. The site integrates with Nuxt Studio for content management and features a comprehensive design system based on Radix UI primitives (via reka-ui).

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Code formatting
npm run format        # Format all files
npm run format:check  # Check formatting without making changes
```

## Architecture Overview

### Component System

The project uses a **hierarchical component structure**:

1. **Ui Components** (`app/components/Ui/`) - Low-level, reusable UI primitives organized in subdirectories (e.g., `Ui/Button`, `Ui/Dialog`, `Ui/Sidebar`). These are built on top of `reka-ui` and styled with Tailwind CSS + `tailwind-variants`.

2. **Prose Components** (`app/components/prose/`) - Custom rendering components for Nuxt Content markdown (e.g., `ProseP.vue`, `ProseH1.vue`, `ProseA.vue`). These are globally registered with the `Prose` prefix and automatically override default markdown HTML output.

3. **App Components** (`app/components/`) - Higher-level, application-specific components like `Header.vue`, `ProjectIndex.vue`, `SideCard.vue`, `BookCover.vue`.

**Important**: All components use `pathPrefix: true` in nuxt.config.ts to avoid naming conflicts. Access components with their full path structure.

### Content Management

This project integrates with **Nuxt Studio** for content editing:

- Content lives in the `content/` directory (markdown files)
- Collections: `articles/` (blog posts) and `portfolio/` (project pages)
- Studio-specific configuration in `nuxt.config.ts`:
  - `content.preview.api` points to Nuxt Studio API
  - `content.editor` enables in-editor editing
  - GitHub integration configured with repo details
- Route rules set `prerender: false` for home page to enable Studio preview
- Uses ISR (Incremental Static Regeneration) with `swr: 3600` for blog pages

**Querying content**: Use `queryCollection('articles')` or `queryCollection('portfolio')` instead of generic `queryContent()` for type-safe queries.

### Styling System

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **Color Mode**: Dark/light theme switching via `@nuxtjs/color-mode` (storage key: `Soft_Spoken-color-mode`)
- **Styling Utilities**:
  - `tailwind-variants` (imported as `tv`) for variant-based component styling
  - `tailwind-merge` for className merging
  - Custom `tw` helper in `app/utils/tw-helper.ts` for type-safe Tailwind classes
- **UI Config**: `ui-thing.config.ts` defines component locations and theme (`neutral`)

### Layout Structure

The default layout (`app/layouts/default.vue`) implements:
- **Responsive sidebar** using custom implementation:
  - Mobile: Uses `UiSidebar` with offcanvas behavior
  - Desktop: Custom sticky sidebar with manual show/hide toggle
- **Navigation**: Hardcoded in layout (Home, About, Work, Blog, Gallery)
- **Theme toggle**: Lamp icon in sidebar footer
- **Two-column grid**: Sidebar + main content area

### Page Routing

- **Static pages**: `/about`, `/work`, `/gallery`, `/blog` (Vue SFC pages in `app/pages/`)
- **Dynamic routes**:
  - `/articles/[...slug]` - Blog article detail pages
  - `/portfolio/[...slug]` - Portfolio project detail pages
- **Content queries**: All pages use `useAsyncData` with Nuxt Content's `queryCollection()` API

### Server Routes

- **API endpoint**: `/api/contact.post.ts` - Contact form handler using Nodemailer
- **Sitemap**: `/server/routes/sitemap.xml.ts` - Dynamic XML sitemap generation
- **Email utility**: `server/utils/email.ts` - Email sending logic

## Key Configuration Details

### Nuxt Config Notable Settings

- **SSR enabled** for SEO
- **View transitions** enabled (experimental)
- **Nitro websocket** enabled for Studio integration
- **Icon optimization**: Client bundle scanning, SVG mode, 2s fetch timeout
- **Vite**: Force optimization, cache disabled, Tailwind CSS plugin
- **Fonts**: Auto-loaded via `@nuxt/fonts`
- **Scripts**: External PDFMake scripts loaded in head

### Auto-imports

Special imports configured in `nuxt.config.ts`:
- `tv` and `VariantProps` from `tailwind-variants`
- `useSonner` (alias for `toast` from `vue-sonner`)

## Working with Content

### Creating New Articles

1. Add markdown file to `content/articles/`
2. Include frontmatter with `title`, `description`, `date`, optional `tags`, `heroImage`
3. Content automatically appears on `/blog` page (sorted by date, descending)
4. Accessible via `/articles/[filename]` route

### Creating Portfolio Items

1. Add markdown file to `content/portfolio/`
2. Include frontmatter with project details
3. Rendered via `ProjectIndex.vue` component on homepage and work page

### Custom Markdown Rendering

Prose components in `app/components/prose/` override default Nuxt Content HTML output. For example:
- `ProseP.vue` adds custom spacing: `mb-4 leading-relaxed`
- `ProseH1.vue` through `ProseH6.vue` style headings
- `ProseImg.vue` handles image rendering with Nuxt Image

## Component Patterns

### Using UI Components

```vue
<!-- Buttons with variants -->
<UiButton variant="outline" size="sm">Click me</UiButton>

<!-- Cards -->
<UiCard>
  <UiCardContent class="py-4">
    Content here
  </UiCardContent>
</UiCard>

<!-- Dialogs/Modals -->
<UiDialog>
  <UiDialogTrigger>Open</UiDialogTrigger>
  <UiDialogContent>...</UiDialogContent>
</UiDialog>

<!-- Sidebar (mobile/desktop patterns in default.vue) -->
<UiSidebarProvider>
  <UiSidebar>...</UiSidebar>
  <UiSidebarInset>...</UiSidebarInset>
</UiSidebarProvider>
```

### State Management

- **Color mode**: Access via `useColorMode()` composable
- **Carousel**: Custom `useCarousel` composable in `app/composables/`
- **No global state store**: Uses composables and component-level state

## Dependencies of Note

- **Nuxt Content v3**: Content management system
- **reka-ui v2**: Unstyled UI primitives (Radix-like)
- **@nuxtjs/seo**: SEO utilities and meta tag management
- **VeeValidate + Zod**: Form validation
- **Motion-v**: Animation library for Vue
- **ApexCharts**: Charting library (client-side component)
- **DataTables**: Table components with advanced features
- **nuxt-mcp**: MCP server integration

## Development Workflow

1. Run `npm run dev` to start development server
2. Content changes in `content/` directory hot-reload automatically
3. Component changes in `app/components/` hot-reload with HMR
4. Use Nuxt Studio for visual content editing (requires Studio setup)
5. Format code with `npm run format` before committing

## Important Notes

- **Never use generic component names** - always use the full path-prefixed name (e.g., `UiButton`, not `Button`)
- **Content queries must specify collection** - use `queryCollection('articles')` not `queryContent('articles')`
- **Tailwind v4 is bleeding edge** - some plugins may not be compatible
- **Prose components are global** - they automatically apply to all markdown content
- **Studio preview requires specific route rules** - don't change `/` route prerender setting
