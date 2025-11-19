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
  <UChangelogVersions
    :versions="versions"
    :ui="{
      container: 'px-0 !pt-0',
      indicator: 'h-[calc(100%-12px)]'
    }"
  >
    <template #body="{ version }">
      <NuxtLink :to="version.to">
        <UCard
          :ui="{
            header: '!p-0',
            body: 'bg-elevated/30 hover:bg-elevated/50 transition-colors'
          }"
        >
          <template #header>
            <Carousel
              v-if="version.gallery"
              :images="version.gallery"
            />
          </template>

          <div class="flex flex-col gap-1">
            <h2 class="text-md font-semibold">
              {{ version.cardTitle }}
            </h2>
            <p class="text-sm">
              {{ version.cardDescription }}
            </p>
          </div>
        </UCard>
      </NuxtLink>
    </template>
  </UChangelogVersions>
</template>
