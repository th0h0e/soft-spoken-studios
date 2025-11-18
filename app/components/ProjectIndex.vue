<script setup lang="ts">
/**
 * ProjectIndex Component for Nuxt Studio
 *
 * Automatically fetches and displays all projects from the projects collection
 * as a linked list separated by bullets.
 *
 * Can be used in two ways:
 * 1. Standalone: <ProjectIndex title="My Projects" />
 * 2. In MDC: ::project-index{title="My Projects"}
 *
 * Features:
 * - Loading state while fetching
 * - Error state if fetch fails
 * - Empty state if no projects
 * - Projects sorted by date (newest first)
 * - Horizontal divider at top
 *
 * Data is sourced from the projects collection
 */

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'Project Index'
  }
)

const { data: projectsList, error, pending } = await useAsyncData(
  'projects-list',
  () => queryCollection('projects').all(),
  {
    transform: projects => projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    default: () => []
  }
)
</script>

<template>
  <div class="py-12 text-center">
    <USeparator class="mb-6" />
    <h2 class="mb-4 text-xl font-semibold">
      <slot name="title">
        {{ props.title }}
      </slot>
    </h2>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="text-muted"
    >
      <p class="text-sm">
        Loading projects...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-destructive"
    >
      <p class="text-sm">
        Error loading projects
      </p>
    </div>

    <!-- Projects List -->
    <div
      v-else-if="projectsList && projectsList.length > 0"
      class="text-muted"
    >
      <p class="text-xl leading-relaxed">
        <template
          v-for="(project, index) in projectsList"
          :key="project.path"
        >
          <NuxtLink
            :to="project.path"
            class="hover:text-foreground transition-colors"
          >
            {{ project.title }}
          </NuxtLink>
          <template v-if="index < projectsList.length - 1">
            •
          </template>
        </template>
      </p>
    </div>

    <!-- No Projects State -->
    <div
      v-else
      class="text-muted"
    >
      <p class="text-sm">
        No projects found
      </p>
    </div>
  </div>
</template>
