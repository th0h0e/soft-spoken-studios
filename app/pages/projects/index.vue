<script setup lang="ts">
import appMeta from '../../app.meta'

useSeoMeta({
  title: appMeta.name,
  description: appMeta.description
})

const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

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
    <ChangeLogVersions
      v-if="projects"
      :projects="projects"
    />
  </UPage>
</template>
