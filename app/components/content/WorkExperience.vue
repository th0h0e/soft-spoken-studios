<script setup lang="ts">
/**
 * WorkExperience Component - Props-Based Format
 *
 * Displays a list of work experience with dates, positions, projects, and links.
 *
 * Usage:
 * <WorkExperience :title="title" :items="experiences" />
 */

interface ExperienceItem {
  date: string
  position: string
  projectName: string
  projectLogo: string
  link: string
}

defineProps<{
  title: string
  items: ExperienceItem[]
}>()
</script>

<template>
  <UPageSection
    :title="title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(experience, index) in items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted flex items-center text-nowrap gap-2"
        >
          <p class="text-sm">
            {{ experience.date }}
          </p>
          <USeparator />
          <ULink
            class="flex items-center gap-1"
            :to="experience.link"
          >
            <span class="text-sm">
              {{ experience.position }}
            </span>
            <div class="inline-flex items-center gap-1">
              <span class="font-bold">{{ experience.projectName }}</span>
              <NuxtImg
                :src="experience.projectLogo"
                :alt="experience.projectName"
                class="size-4 object-contain"
              />
            </div>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>
