# Blog Content Components

This directory contains MDC (Markdown Components) for use in blog posts with Nuxt Studio visual editor.

## 🎯 Overview

These components wrap existing Ui components or provide custom functionality specifically for blog content. They are automatically available in Nuxt Studio and can be used in any Markdown file.

---

## 📦 Available Components

### 1. BlogCard
Wraps `UiCard` - Display content in a card layout

```markdown
::blog-card
#title
Card Title

#description
Optional description

#default
Main card content goes here

#footer
Optional footer content
::
```

---

### 2. BlogAlert
Wraps `UiAlert` - Show important notices or warnings

```markdown
::blog-alert
---
variant: warning
icon: lucide:alert-triangle
---
#title
Important Notice

#default
This is an alert message that needs attention.
::
```

**Props:**
- `variant`: `default` | `destructive` (default: `default`)
- `icon`: Lucide icon name (e.g., `lucide:info`, `lucide:alert-triangle`)

---

### 3. BlogButton
Wraps `UiButton` - Add clickable buttons with links

```markdown
::blog-button
---
variant: default
size: lg
icon: lucide:arrow-right
to: /contact
external: false
---
Get in Touch
::
```

**Props:**
- `variant`: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
- `size`: `default` | `sm` | `lg` | `icon`
- `icon`: Lucide icon name
- `to`: Link destination (internal or external)
- `external`: Boolean - opens in new tab if true

---

### 4. BlogTabs
Wraps `UiTabs` - Create tabbed content sections

```markdown
::blog-tabs
---
tabs:
  - label: Preview
    value: preview
    icon: lucide:eye
  - label: Code
    value: code
    icon: lucide:code
defaultValue: preview
---
#preview
This is the preview content

#code
\```javascript
console.log('code here')
\```
::
```

**Props:**
- `tabs`: Array of `{ label: string, value: string, icon?: string }`
- `defaultValue`: Tab value to show initially (defaults to first tab)

---

### 5. BlogAccordion
Wraps `UiAccordion` - Collapsible FAQ or content sections

```markdown
::blog-accordion
---
type: single
collapsible: true
items:
  - title: What is copywriting?
    content: Copywriting is the art of writing persuasive text...
    icon: lucide:pen-tool
  - title: How long does a project take?
    content: Most projects take 2-4 weeks...
    icon: lucide:clock
---
::
```

**Props:**
- `items`: Array of `{ title: string, content: string, icon?: string }`
- `type`: `single` | `multiple` (default: `single`)
- `collapsible`: Boolean (default: `true`)

---

### 6. BlogBadge
Wraps `UiBadge` - Small labels or tags

```markdown
::blog-badge
---
variant: default
size: default
icon: lucide:tag
---
Featured
::
```

**Inline usage:**
```markdown
This article is ::blog-badge{variant="outline"}New::
```

**Props:**
- `variant`: `default` | `secondary` | `destructive` | `outline`
- `size`: `default` | `sm` | `lg`
- `icon`: Lucide icon name

---

### 7. BlogImage
Custom component - Enhanced images with captions

```markdown
::blog-image
---
src: /images/my-photo.jpg
alt: Beautiful mountain landscape
caption: The view from Mount Everest
shadow: true
aspectRatio: 16/9
size: lg
alignment: center
---
::
```

**Props:**
- `src`: Image path (required)
- `alt`: Alt text (required)
- `caption`: Image caption
- `shadow`: Boolean - adds shadow effect (default: `true`)
- `aspectRatio`: Numeric ratio (e.g., `16/9`, `4/3`, `1/1`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `alignment`: `left` | `center` | `right` (default: `center`)

---

### 8. BlogQuote
Custom component - Styled blockquotes with attribution

```markdown
::blog-quote
---
author: Steve Jobs
source: Stanford Commencement Speech
---
Stay hungry, stay foolish.
::
```

**Or with custom footer:**
```markdown
::blog-quote
#default
The only way to do great work is to love what you do.

#footer
— **Steve Jobs**, Apple Founder
::
```

**Props:**
- `author`: Quote author
- `source`: Source/context of the quote

---

## 🎨 Usage in Nuxt Studio

1. Open your blog post in Nuxt Studio
2. Switch to **visual editor mode**
3. Type `::` to see available components
4. Select a component from the dropdown
5. Edit props and content visually
6. See live preview as you type

---

## 🔧 Extending Components

To add more components:

1. Create a new file in `app/components/content/`
2. Name it with `Blog` prefix (e.g., `BlogVideo.vue`)
3. Use existing Ui components or create custom ones
4. Add usage documentation in component comments
5. Component is automatically available in Studio

### Example Template:

```vue
<template>
  <YourUiComponent :prop="prop">
    <slot mdc-unwrap="p" />
  </YourUiComponent>
</template>

<script setup>
/**
 * BlogYourComponent - Description
 *
 * Usage in Markdown:
 * ::blog-your-component
 * ---
 * prop: value
 * ---
 * Content here
 * ::
 */

defineProps({
  prop: {
    type: String,
    default: 'default-value',
  },
})
</script>
```

---

## 📝 Best Practices

1. **Always use `mdc-unwrap="p"`** on slots to remove wrapper paragraphs
2. **Provide clear inline documentation** in component comments
3. **Use semantic prop names** that make sense in markdown
4. **Test in Nuxt Studio** before committing
5. **Keep components simple** - one responsibility per component
6. **Leverage existing Ui components** - don't duplicate code

---

## 🚀 Example Blog Post

```markdown
---
title: Writing Better Copy
date: 2024-01-15
heroImage: /images/writing.jpg
tags:
  - Copywriting
  - Strategy
---

# Writing Better Copy

Great copywriting starts with understanding your audience.

::blog-alert
---
variant: default
icon: lucide:lightbulb
---
#title
Pro Tip

#default
Always start with research before writing a single word.
::

## Key Principles

::blog-tabs
---
tabs:
  - label: Clarity
    value: clarity
  - label: Brevity
    value: brevity
  - label: Impact
    value: impact
---
#clarity
Clear writing is concise and easy to understand.

#brevity
Every word should earn its place.

#impact
Make every sentence count.
::

::blog-image
---
src: /images/workspace.jpg
alt: Creative workspace
caption: Where ideas come to life
aspectRatio: 16/9
---
::

::blog-quote
---
author: David Ogilvy
source: Confessions of an Advertising Man
---
Don't bunt. Aim out of the ball park.
::

::blog-button
---
variant: default
to: /contact
icon: lucide:arrow-right
---
Start Your Project
::
```

---

## 🎯 Next Steps

1. Test components in your blog posts
2. Create additional components as needed
3. Share with your team
4. Gather feedback from content editors
5. Iterate and improve!
