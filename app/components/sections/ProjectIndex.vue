<template>
  <div class="py-12 text-center">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <h2 class="mb-4 text-xl font-semibold">Project Index</h2>

    <!-- Loading State -->
    <div v-if="pending" class="text-muted-foreground">
      <p class="text-sm">Loading projects...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-destructive">
      <p class="text-sm">Error loading projects</p>
    </div>

    <!-- Projects List -->
    <div v-else-if="portfolioProjects && portfolioProjects.length > 0" class="text-muted-foreground">
      <p class="text-xl leading-relaxed">
        <template v-for="(project, index) in portfolioProjects" :key="project.path">
          <NuxtLink
            :to="project.path"
            class="hover:text-foreground transition-colors"
          >
            {{ project.title }}
          </NuxtLink>
          <template v-if="index < portfolioProjects.length - 1">
            •
          </template>
        </template>
      </p>
    </div>

    <!-- No Projects State -->
    <div v-else class="text-muted-foreground">
      <p class="text-sm">No projects found</p>
    </div>
  </div>
</template>

<script setup>
const { data: portfolioProjects, error, pending } = await useAsyncData(
  'portfolio-index',
  () => queryCollection('portfolio').all(),
  {
    transform: (projects) => projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    default: () => []
  }
);
</script>
