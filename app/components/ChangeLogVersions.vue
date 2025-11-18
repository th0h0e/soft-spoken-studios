<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

const props = defineProps<{
  projects: ProjectsCollectionItem[]
}>()

const versions = computed(() => {
  return props.projects.map(project => ({
    date: project.date,
    to: project.path,

    cardTitle: project.title,
    cardDescription: project.description,
    gallery: project.gallery
  }))
})
</script>

<template>
  <UChangelogVersions :versions="versions">
    <template #body="{ version }">
      <UCard variant="subtle">
        <template #header>
          <Carousel
            v-if="version.gallery"
            :images="version.gallery"
          />
        </template>

        <h2 class="text-xl font-semibold">
          {{ version.cardTitle }}
        </h2>
        <p class="text-sm">
          {{ version.cardDescription }}
        </p>

        <template #footer>
          <UButton
            label="Learn More"
            size="xs"
            :to="version.to"
          />
        </template>
      </UCard>
    </template>

    <template #footer>
      <USeparator icon="i-simple-icons-nuxtdotjs" />
    </template>
  </UChangelogVersions>
</template>
