<script setup lang="ts">
/**
 * ProjectIndex MDC Component
 *
 * Displays a list of recent projects from the projects collection
 *
 * Usage in markdown:
 * ::projectIndex
 * ---
 * title: Recent Projects
 * ---
 * ::
 */

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'Project Index'
  }
)

const { data: projectsList } = await useAsyncData(
  'projects-list',
  () => queryCollection('projects').all(),
  {
    transform: projects => projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    default: () => []
  }
)
</script>

<template>
  <div class="pb-24 sm:pb-32 lg:pb-48 px-12">
    <h2 class="mb-4 text-xl text-center font-semibold">
      <slot name="title">
        {{ props.title }}
      </slot>
    </h2>

    <p
      v-if="projectsList && projectsList.length > 0"
      class="text-lg text-center leading-relaxed text-muted"
    >
      <NuxtLink
        v-for="(project, index) in projectsList"
        :key="project.path"
        :to="project.path"
        class="hover:text-default transition-colors"
      >
        {{ project.title }}<span v-if="index < projectsList.length - 1"> • </span>
      </NuxtLink>
    </p>
  </div>
</template>
