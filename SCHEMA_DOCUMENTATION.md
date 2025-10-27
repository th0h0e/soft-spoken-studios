# Schema Documentation

This document provides comprehensive documentation for all Nuxt Content collections and their Zod schemas used in this project.

## Overview

This project uses **Nuxt Content v3.7.0** with **Zod v3.25.76** for type-safe content management. Schemas are defined in `content.config.ts` and automatically generate forms in Nuxt Studio.

### Collection Types

- **Page Collections** (`type: "page"`): Markdown files with frontmatter (articles, portfolio)
- **Data Collections** (`type: "data"`): YAML files for structured data (gallery, settings)

---

## Articles Collection

The articles collection contains blog posts and editorial content.

### Schema Definition

```typescript
const articlesSchema = z.object({
  // Core Fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Optional Content Fields
  excerpt: z.string().optional(),
  text1: z.string().optional(),
  text2: z.string().optional(),
  text3: z.string().optional(),

  // Images
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),
  footerImage: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),

  // Taxonomy
  tags: z.array(z.string()).optional().default([]),
  category: z.string().optional(),

  // Status
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),

  // Metadata
  author: z.object({
    name: z.string(),
  }).optional(),
  readingTime: z.string().optional(),

  // SEO
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Article headline |
| `description` | string | Yes | Brief summary/subtitle |
| `date` | date | Yes | Publication date |
| `excerpt` | string | No | Preview text for listings |
| `text1` | string | No | First highlighted quote/callout |
| `text2` | string | No | Second highlighted quote/callout |
| `text3` | string | No | Third highlighted quote/callout |
| `image` | object | No | Main article image with media picker |
| `footerImage` | object | No | Footer/closing image with media picker |
| `tags` | array | No | Array of tag strings |
| `category` | string | No | Primary category |
| `featured` | boolean | No | Show in featured sections (default: false) |
| `draft` | boolean | No | Hide from public (default: false) |
| `author.name` | string | No | Author name |
| `readingTime` | string | No | Estimated reading time (e.g., "6 min read") |
| `seo.title` | string | No | Custom SEO title |
| `seo.description` | string | No | Custom meta description |
| `seo.ogImage` | string | No | Social sharing image path |

### Usage Example

**Frontmatter:**
```yaml
---
title: Why Good Copy Sounds Like Conversation
description: The best marketing copy doesn't sound like marketing at all. It sounds like a person talking to another person.
date: 2024-11-08
excerpt: Great copywriting isn't about clever wordplay or corporate jargon. It's about clarity, empathy, and speaking to people the way they actually think and talk.
text1: The next time you're writing copy, read it out loud. If you wouldn't say it to a friend over coffee, don't say it to your customers.
text2: Remember that conversational doesn't mean casual. Professional and approachable aren't opposites.
text3: The best brands sound like people, not corporations. They have personality, point of view, and the confidence to use contractions.
image:
  src: /Gallery/img_65dcd5a723854.jpg
  alt: Person writing at desk with natural light
footerImage:
  src: /Gallery/crosscurrent.webp
  alt: Creative workspace with typewriter
tags:
  - Copywriting
  - Brand Voice
  - Writing Tips
  - Marketing
category: Copywriting
featured: true
draft: false
author:
  name: Soft Spoken Studios
readingTime: 6 min read
seo:
  title: Why Good Copy Sounds Like Conversation | Soft Spoken Studios
  description: Learn how to write marketing copy that connects with readers by sounding natural, conversational, and human.
  ogImage: /Gallery/img_65dcd5a723854.jpg
---

Your article content goes here...
```

**Querying:**
```vue
<script setup>
const { data: articles } = await useAsyncData(
  'featured-articles',
  () => queryCollection('articles')
    .where('featured', true)
    .where('draft', false)
    .sort({ date: -1 })
    .all()
);
</script>
```

### YAML Frontmatter Notes

- **Colons in strings**: Wrap entire value in quotes if it contains colons
  ```yaml
  text1: "Before you hit record, ask yourself: would I watch this?"
  ```
- **Quotes in strings**: Avoid nested quotes or escape them properly
  ```yaml
  # Bad
  excerpt: "Make it pop" isn't helpful feedback

  # Good
  excerpt: Make it pop isn't helpful feedback
  ```

---

## Portfolio Collection

The portfolio collection showcases completed projects and case studies.

### Schema Definition

```typescript
const portfolioSchema = z.object({
  // Core Fields
  title: z.string(),
  description: z.string(),
  date: z.date(),

  // Project Details
  client: z.string().optional(),
  status: z.enum(['completed', 'in-progress', 'archived']).optional().default('completed'),
  featured: z.boolean().optional().default(false),

  // Images
  image: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  }).optional(),
  gallery: z.array(z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string().optional(),
  })).optional().default([]),

  // Content
  overview: z.string().optional(),
  duration: z.string().optional(),
  year: z.number().optional(),

  // SEO
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Project name |
| `description` | string | Yes | Brief project description |
| `date` | date | Yes | Completion/publication date |
| `client` | string | No | Client name |
| `status` | enum | No | Project status: completed, in-progress, archived |
| `featured` | boolean | No | Display on work page (default: false) |
| `image` | object | No | Main project image with media picker |
| `gallery` | array | No | Array of gallery images for carousel |
| `overview` | string | No | Detailed project overview |
| `duration` | string | No | Project timeline (e.g., "6 months") |
| `year` | number | No | Project year |
| `seo.title` | string | No | Custom SEO title |
| `seo.description` | string | No | Custom meta description |
| `seo.ogImage` | string | No | Social sharing image path |

### Usage Example

**Frontmatter:**
```yaml
---
title: Tech Startup Brand Identity & Launch Campaign
description: Complete brand development and go-to-market strategy for an innovative AI-powered productivity platform targeting remote teams.
date: 2024-09-15
client: Flowstate Technologies
status: completed
featured: true
image:
  src: /Gallery/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg
gallery:
  - src: /Gallery/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg
  - src: /Gallery/img_65dcd5a723854.jpg
  - src: /Gallery/tumblr_776a5a41a0251f41fd84759fd74ae9a4_d3a06d92_1280.jpg
  - src: /Gallery/tumblr_86912c63813414c4da3d7c95d6c6567a_074245b7_1280.jpg
  - src: /Gallery/crosscurrent.webp
overview: Flowstate Technologies needed a complete brand identity...
duration: 6 months
year: 2024
seo:
  title: Tech Startup Brand Identity Case Study | Soft Spoken Studios
  description: How strategic brand development helped a tech startup...
  ogImage: /Gallery/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg
---

## The Challenge

Full case study content...
```

**Querying:**
```vue
<script setup>
const { data: portfolioProjects } = await useAsyncData(
  'portfolio-projects',
  () => queryCollection('portfolio')
    .where('featured', true)
    .sort({ date: -1 })
    .all()
);

// Get project images for carousel
const getProjectImages = (project) => {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery;
  }
  if (project.image) {
    return [project.image];
  }
  return [];
};
</script>
```

**Carousel Implementation:**
```vue
<template>
  <UiCarousel
    class="group relative w-full"
    :plugins="[Autoplay({ delay: 3000, stopOnInteraction: true })]"
  >
    <UiCarouselContent>
      <UiCarouselItem
        v-for="(image, index) in getProjectImages(project)"
        :key="index"
        grab-cursor
      >
        <div class="overflow-hidden rounded-lg">
          <UiAspectRatio :ratio="16 / 9">
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="h-full w-full object-cover"
              width="800"
              height="450"
            />
          </UiAspectRatio>
        </div>
      </UiCarouselItem>
    </UiCarouselContent>
    <UiCarouselPrevious class="left-4 opacity-0 transition-opacity group-hover:opacity-100" />
    <UiCarouselNext class="right-4 opacity-0 transition-opacity group-hover:opacity-100" />
  </UiCarousel>
</template>
```

---

## Gallery Collection

The gallery collection is a **data collection** (`type: "data"`) stored in `content/gallery.yml`.

### Schema Definition

```typescript
const gallerySchema = z.object({
  items: z.array(z.object({
    image: z.object({
      src: property(z.string()).editor({ input: 'media' }),
      alt: z.string().optional(),
    }).optional(),
    caption: z.string().optional(),
  })).optional().default([]),
});
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | No | Array of gallery items |
| `items[].image.src` | string | No | Image path with media picker |
| `items[].image.alt` | string | No | Image alt text |
| `items[].caption` | string | No | Image caption |

### Usage Example

**YAML Structure (content/gallery.yml):**
```yaml
items:
  # Item 1
  - image:
      src: /Gallery/img_65dcd5a723854.jpg
      alt: Gallery image
    caption: Quiet moments in natural light.

  # Item 2
  - image:
      src: /Gallery/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg
      alt: Gallery image
    caption: Capturing authentic stories through film.

  # ... 100 items total
```

**Querying:**
```vue
<script setup>
const { data: gallery } = await useAsyncData(
  'gallery',
  () => queryCollection('gallery').first()
);

const items = computed(() => gallery.value?.items || []);

// Filter out empty items
const visibleItems = computed(() => {
  return items.value.filter(item =>
    item.image?.src && item.image.src.trim() !== ''
  );
});
</script>
```

**Layout Pattern:**

The gallery uses a repeating 19-item layout pattern for irregular grid:

```vue
<script setup>
const layoutPattern = [
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },      // Tall portrait
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // Square
  { ratio: 16/9, class: 'col-span-2', width: 800, height: 450 },      // Wide landscape
  { ratio: 4/3, class: '', width: 400, height: 300 },                 // Landscape
  { ratio: 9/16, class: 'row-span-2', width: 400, height: 711 },      // Vertical video
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // Square
  { ratio: 3/2, class: 'col-span-2', width: 800, height: 533 },       // Wide
  { ratio: 2/3, class: 'row-span-2', width: 400, height: 600 },       // Portrait
  { ratio: 4/3, class: '', width: 400, height: 300 },                 // Landscape
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // Square
  { ratio: 16/9, class: 'col-span-2', width: 800, height: 450 },      // Wide
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },       // Portrait
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // Square
  { ratio: 4/3, class: '', width: 400, height: 300 },                 // Landscape
  { ratio: 3/2, class: 'col-span-2', width: 800, height: 533 },       // Wide
  { ratio: 2/3, class: 'row-span-2', width: 400, height: 600 },       // Portrait
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // Square
  { ratio: 16/9, class: 'col-span-2', width: 800, height: 450 },      // Wide
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },       // Tall portrait
];

const getLayoutClass = (index) => {
  const patternIndex = index % layoutPattern.length;
  return layoutPattern[patternIndex].class;
};

const getImageDimensions = (index) => {
  const patternIndex = index % layoutPattern.length;
  return {
    width: layoutPattern[patternIndex].width,
    height: layoutPattern[patternIndex].height,
  };
};
</script>

<template>
  <div class="grid auto-rows-[400px] grid-cols-2 gap-4">
    <div
      v-for="(item, index) in visibleItems"
      :key="index"
      :class="getLayoutClass(index)"
      class="overflow-hidden rounded-lg"
    >
      <NuxtImg
        :src="item.image.src"
        :alt="item.image.alt || 'Gallery image'"
        class="h-full w-full object-cover"
        :width="getImageDimensions(index).width"
        :height="getImageDimensions(index).height"
      />
    </div>
  </div>
</template>
```

---

## Settings Collection

The settings collection is a **data collection** for global site configuration. See [SETTINGS_USAGE.md](./SETTINGS_USAGE.md) for complete documentation.

### Schema Definition

```typescript
const settingsSchema = z.object({
  site: z.object({
    name: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    email: z.string().email().optional(),
    logo: z.object({
      src: property(z.string()).editor({ input: 'media' }),
      alt: z.string().optional(),
    }).optional(),
  }),
  smtp: z.object({
    host: z.string(),
    port: z.number(),
    secure: z.boolean().optional().default(true),
    user: z.string(),
    password: z.string(),
    fromEmail: z.string().email(),
    fromName: z.string(),
  }).optional(),
});
```

### Quick Reference

**YAML (content/settings.yml):**
```yaml
site:
  name: Soft Spoken Studios
  description: We tell stories that matter
  url: https://softspokenstudios.com
  email: hello@softspokenstudios.com

smtp:
  host: smtp.gmail.com
  port: 587
  secure: true
  user: your-email@gmail.com
  password: your-app-password
  fromEmail: hello@softspokenstudios.com
  fromName: Soft Spoken Studios
```

**Usage:**
```vue
<script setup>
const { data: settings } = await useAsyncData(
  'settings',
  () => queryCollection('settings').first()
);
</script>

<template>
  <div>{{ settings.site.name }}</div>
</template>
```

---

## Field Types Reference

### Media Picker

For images and media assets that integrate with Nuxt Studio's media browser:

```typescript
property(z.string()).editor({ input: 'media' })
```

**Result in Nuxt Studio:** Renders a button that opens the media picker dialog.

### Date

For publication dates and timestamps:

```typescript
z.date()
```

**In YAML:**
```yaml
date: 2024-11-08  # YYYY-MM-DD format
```

### Boolean

For true/false flags:

```typescript
z.boolean().optional().default(false)
```

**In YAML:**
```yaml
featured: true
draft: false
```

### Enum

For predefined choices:

```typescript
z.enum(['completed', 'in-progress', 'archived'])
```

**In YAML:**
```yaml
status: completed  # Must be one of the enum values
```

### Array of Strings

For tags, categories, etc:

```typescript
z.array(z.string()).optional().default([])
```

**In YAML:**
```yaml
tags:
  - Copywriting
  - Brand Voice
  - Marketing
```

### Array of Objects

For galleries, lists of structured data:

```typescript
z.array(z.object({
  src: property(z.string()).editor({ input: 'media' }),
  alt: z.string().optional(),
})).optional().default([])
```

**In YAML:**
```yaml
gallery:
  - src: /Gallery/image1.jpg
    alt: First image
  - src: /Gallery/image2.jpg
    alt: Second image
```

### Nested Object

For structured data groups:

```typescript
z.object({
  title: z.string().optional(),
  description: z.string().optional(),
}).optional()
```

**In YAML:**
```yaml
seo:
  title: Custom SEO Title
  description: Custom meta description
```

---

## Nuxt Studio Integration

### Automatic Form Generation

Schemas automatically generate editing forms in Nuxt Studio with:

- **Text inputs** for strings
- **Textareas** for long strings
- **Date pickers** for dates
- **Checkboxes** for booleans
- **Dropdowns** for enums
- **Media pickers** for `property(z.string()).editor({ input: 'media' })`
- **Repeater fields** for arrays

### Media Picker Integration

The `property(z.string()).editor({ input: 'media' })` pattern creates a button in Nuxt Studio that:

1. Opens the media browser
2. Allows browsing uploaded assets
3. Inserts the selected path into the field
4. Works for single images and gallery arrays

### Creating New Content

**In Nuxt Studio:**
1. Navigate to Collections sidebar
2. Click the collection (Articles, Portfolio, etc.)
3. Click "Create New"
4. Fill out auto-generated form
5. Save and publish

**Locally:**
1. Create new `.md` file in appropriate directory
2. Add frontmatter with all required fields
3. Write content below frontmatter
4. File automatically appears in Nuxt Studio

---

## Common Patterns

### Querying Featured Content

```vue
<script setup>
const { data } = await useAsyncData(
  'featured-content',
  () => queryCollection('articles')
    .where('featured', true)
    .where('draft', false)
    .sort({ date: -1 })
    .limit(3)
    .all()
);
</script>
```

### Filtering by Category

```vue
<script setup>
const route = useRoute();
const category = route.params.category;

const { data } = await useAsyncData(
  `category-${category}`,
  () => queryCollection('articles')
    .where('category', category)
    .sort({ date: -1 })
    .all()
);
</script>
```

### Getting Single Item

```vue
<script setup>
const route = useRoute();

const { data: article } = await useAsyncData(
  `article-${route.path}`,
  () => queryCollection('articles').path(route.path).first()
);
</script>
```

### Data Collection Access

```vue
<script setup>
const { data: settings } = await useAsyncData(
  'settings',
  () => queryCollection('settings').first()
);

const { data: gallery } = await useAsyncData(
  'gallery',
  () => queryCollection('gallery').first()
);
</script>
```

---

## Best Practices

### Schema Design

1. **Use optional() wisely**: Only make fields truly optional, not just convenient
2. **Provide defaults**: Use `.default()` for booleans and arrays
3. **Media picker for all images**: Always use `property(z.string()).editor({ input: 'media' })`
4. **Group related fields**: Use nested objects for SEO, author, etc.

### YAML Frontmatter

1. **Quote special characters**: Wrap in quotes if string contains `:` or `"` or `'`
2. **Avoid nested quotes**: Remove inner quotes or escape properly
3. **Consistent date format**: Use YYYY-MM-DD
4. **Proper array syntax**: Use dash notation for arrays

### Content Organization

1. **One schema per collection**: Keep schemas focused
2. **Consistent naming**: Use camelCase for field names
3. **Descriptive field names**: Prefer `readingTime` over `time`
4. **Logical grouping**: Put similar fields together in schema

### Performance

1. **Limit queries**: Use `.limit()` to avoid loading too much
2. **Filter early**: Apply `.where()` before `.sort()`
3. **Use defaults**: Provide default empty arrays to avoid null checks
4. **Cache queries**: Use `useAsyncData` with stable keys

---

## Troubleshooting

### YAML Parsing Errors

**Error:** "Nested mappings are not allowed"
**Fix:** Wrap the value in quotes
```yaml
# Before
text1: Before you hit record, ask yourself: would I watch this?

# After
text1: "Before you hit record, ask yourself: would I watch this?"
```

**Error:** "Unexpected scalar at node end"
**Fix:** Remove nested quotes
```yaml
# Before
excerpt: "Make it pop" isn't helpful

# After
excerpt: Make it pop isn't helpful
```

### SSR Errors with Animations

**Error:** "Failed to resolve directive: motion"
**Fix:** Wrap animated components in `ClientOnly`
```vue
<ClientOnly>
  <Motion v-if="condition" :initial="{...}">
    <!-- content -->
  </Motion>
  <template #fallback>
    <div>
      <!-- static fallback for SSR -->
    </div>
  </template>
</ClientOnly>
```

### Media Picker Not Working

**Issue:** Field shows text input instead of media picker
**Fix:** Use exact syntax
```typescript
// Correct
property(z.string()).editor({ input: 'media' })

// Incorrect
z.string()  // Shows text input
```

### Array Defaults Breaking

**Issue:** Empty arrays showing as null
**Fix:** Always provide `.default([])`
```typescript
z.array(z.string()).optional().default([])
```

---

## Additional Resources

- [Nuxt Content Documentation](https://content.nuxt.com)
- [Zod Documentation](https://zod.dev)
- [Nuxt Studio Guide](https://nuxt.studio)
- [Settings Usage Guide](./SETTINGS_USAGE.md)

---

**Last Updated:** 2024-11-09
