1. Catch-all Route Pattern

- [...slug].vue matches all routes under its

directory

- Route segments are collected into an array:

$route.params.slug

- Nuxt 2: _.vue → Nuxt 4: [...slug].vue

2. Dynamic Route Parameters

- Single param: [id].vue → /posts/:id

- Optional param: [[slug]].vue → /posts/:slug?

- Catch-all: [...slug].vue → /posts/*

3. Accessing Route Data (app/pages/[...slug].vue:5)

const route = useRoute()

// Access params, query, path, etc.

4. Data Fetching with Dynamic Keys

(app/pages/[...slug].vue:15-52)

Your pattern is optimal:

const { data: page } = await useAsyncData(

() => page-${route.path}, // Dynamic key ✓

async () => { /* fetch logic */ },

{ watch: [() => route.path] } // Watch for changes

✓

)

5. Route Validation (optional enhancement)

You could add validation to your pages:

definePageMeta({

validate: async (route) => {

// Validate route params before rendering

return /^\/articles\/[a-z0-9-]+$/.test(route.path)

}

})

6. Single Root Element Requirement

⚠️ Important: Pages must have ONE root element (no

comments at root level)

<!-- ✓ CORRECT -->

<template>

<div v-if="page">...</div>

</template>

<!-- ✗ WRONG -->

<template>

<!-- Comment here breaks navigation -->

<div>...</div>

</template>

7. Pre-rendering Dynamic Routes

For static generation, you can add routes dynamically:

// nuxt.config.ts

hooks: {

async 'prerender:routes'(ctx) {

const articles = await

queryCollection('articles').all()

articles.forEach(article => {

ctx.routes.add(article.path)

})

}

}