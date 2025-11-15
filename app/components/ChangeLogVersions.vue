<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

const props = defineProps<{
  projects: ProjectsCollectionItem[]
}>()

const versions = computed(() => {
  return props.projects.map(project => ({
    title: project.title,
    description: project.description,
    image: project.image,
    date: project.date,
    to: project.path,
    gallery: project.gallery,
    ui: {
      container: 'max-w-lg'
    }
  }))
})
</script>

<template>
  <UChangelogVersions :versions="versions">
    <template #body="{ version }">
      <UCard class="mt-4">
        <template #header>
          <h3 class="text-lg font-semibold">
            {{ version.title }}
          </h3>
        </template>

        <p>
          <Carousel :images="version.gallery" />
        </p>

        <template #footer>
          <div class="flex gap-2">
            <UButton
              label="Learn More"
              size="xs"
              :to="version.to"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UChangelogVersions>
</template>
