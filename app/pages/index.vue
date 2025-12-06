<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.book?.title,
  ogTitle: page.value?.book?.title,
  description: page.value?.book?.subtitle,
  ogDescription: page.value?.book?.subtitle
})
</script>

<template>
  <UPage v-if="page">
    <!-- Render all MDC components from markdown body -->
    <ContentRenderer :value="page" />
  </UPage>
</template>
