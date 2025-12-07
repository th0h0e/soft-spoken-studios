<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('collectionPages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />
    <div class="py-8">
      <USeparator
        color="neutral"
        type="solid"
      />
    </div>
    <Test
      v-if="projects"
      :projects="projects"
    />
  </UPage>
</template>
