<template>
  <div class="py-12 text-center">
    <h2 class="mb-4 text-xl font-semibold">Project Index</h2>

    <div class="text-muted-foreground">
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
  </div>
</template>

<script setup>
const { data: portfolioProjects } = await useAsyncData(
  'portfolio-index',
  () => queryCollection('portfolio')
    .sort({ date: -1 })
    .all(),
  {
    default: () => []
  }
);
</script>
