---
title: Finding Your Creative Voice in a Noisy World
description: Reflections on the creative journey, challenges faced, and lessons
  learned. How to develop your unique voice while staying authentic.
date: 2024-09-30
image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center
tags:
  - Creative Process
  - Personal Growth
  - Authenticity
  - Inspiration
featured: false
excerpt: Reflections on the creative journey, challenges faced, and lessons
  learned. How to develop your unique voice while staying authentic.
---

Overview

Nuxt Studio automatically generates forms based on your Zod schema definitions in

content.config.ts. The key is using the .editor() method and property() helper to

customize form inputs.

Available Input Types

1\. Media Picker (Images/Files)

image: property(z.string()).editor({ input: 'media' })

\- Shows image thumbnail + file picker

\- Perfect for hero images, thumbnails, etc.

2\. Icon Selector

icon: property(z.string()).editor({

input: 'icon',

iconLibraries: \['lucide', 'simple-icons']

})

\- Visual icon picker from specified libraries

\- Great for feature icons, badges, etc.

3\. Dropdown Select

category: z.enum(\['Alps', 'Himalaya', 'Pyrenees'])

\- Auto-generates dropdown from enum values

4\. Hidden Fields

slug: property(z.string()).editor({ hidden: true })

\- Stores data but hides from UI

\- Useful for auto-generated values

5\. Default Inputs

title: z.string() // Text input

description: z.string() // Text input

date: z.date() // Date picker

draft: z.boolean() // Checkbox

tags: z.array(z.string()) // Array editor (JSON)

Complete Example - Blog Schema

// content.config.ts

import { defineCollection, defineContentConfig, property } from '@nuxt/content'

import { z } from 'zod'

export default defineContentConfig({

collections: {

blog: defineCollection({

type: 'page',

source: 'blog/\*.md',

schema: z.object({

// Basic text inputs

title: z.string(),

description: z.string().optional(),

// Date picker

date: z.date(),

publishedAt: z.date().optional(),

// Checkbox

draft: z.boolean().default(false),

featured: z.boolean().optional(),

// Dropdown select

category: z.enum(\['Tech', 'Design', 'Business']).optional(),

// Media picker with image preview

coverImage: z.object({

src: property(z.string()).editor({ input: 'media' }),

alt: z.string()

}),

// Icon selector

icon: property(z.string()).editor({

input: 'icon',

iconLibraries: \['lucide', 'heroicons']

}),

// Hidden field (auto-generated slug)

slug: property(z.string()).editor({ hidden: true }),

// Array (shows as JSON editor)

tags: z.array(z.string()).optional(),

// Nested object for author

author: z.object({

name: z.string(),

avatar: property(z.string()).editor({ input: 'media' }),

bio: z.string().optional()

})

})

})

}

})

What You Get in Studio

This schema generates a form with:

\- ✅ Text inputs for title, description, author name

\- ✅ Date pickers for date & publishedAt

\- ✅ Checkboxes for draft & featured

\- ✅ Dropdown for category

\- ✅ Image pickers for coverImage & author.avatar (with thumbnails!)

\- ✅ Icon selector for icon field

\- ✅ Hidden slug field (not visible in UI)

\- ✅ JSON array editor for tags

Your Current Setup

Your articles schema would look better like this:

const commonArticleSchema = z.object({

title: z.string(),

date: z.string(), // or z.date() for date picker

description: z.string().optional(),

// Image with media picker

image: property(z.string().optional())

.editor({ input: 'media' }),

excerpt: z.string().optional(),

tags: z.array(z.string()).optional(),

featured: z.boolean().optional(),

});

Pro Tips

1\. Use property() wrapper for .editor() method:

// ✅ Correct

image: property(z.string()).editor({ input: 'media' })

// ❌ Won't work

image: z.string().editor({ input: 'media' })

2\. Nested objects work great for grouping related fields:

hero: z.object({

title: z.string(),

image: property(z.string()).editor({ input: 'media' }),

caption: z.string().optional()

})

3\. Default values pre-fill forms:

draft: z.boolean().default(false) // Checkbox starts unchecked

The form automatically updates whenever you change your schema!
