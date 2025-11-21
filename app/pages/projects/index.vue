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

const { global } = useAppConfig()
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
    <div
      v-if="page.links"
      class="flex items-center gap-2 px-4 pb-8"
    >
      <UButton
        :label="page.links[0]?.label"
        :to="global.meetingLink"
        v-bind="page.links[0]"
      />
      <UButton
        :to="`mailto:${global.email}`"
        v-bind="page.links[1]"
      />
    </div>
    <ChangeLogVersions
      v-if="projects"
      :projects="projects"
    />
  </UPage>
</template>
