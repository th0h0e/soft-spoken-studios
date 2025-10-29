<template>
  <div class="space-y-8">
    <Header
      headline="Portfolio"
      title="Selected work in copywriting and video production"
      description="A collection of projects that showcase our approach to thoughtful communication and authentic storytelling."
    />

    <div class="-mt-8 pb-16">
      <!-- Loading State -->
      <div v-if="pending" class="flex h-64 flex-col items-center justify-center">
        <Icon name="svg-spinners:ring-resize" class="h-8 w-8 text-muted" />
        <p class="mt-4 text-muted">Loading portfolio projects...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex h-64 flex-col items-center justify-center">
        <Icon name="lucide:alert-circle" class="h-8 w-8 text-destructive" />
        <p class="mt-4 text-destructive">Failed to load portfolio projects</p>
        <UiButton @click="refresh" variant="outline" class="mt-4">
          Try Again
        </UiButton>
      </div>

      <!-- Portfolio List -->
      <div v-else-if="portfolioProjects?.length" class="space-y-8">
        <!-- Portfolio Item -->
        <NuxtLink v-for="project in portfolioProjects" :key="project._id" :to="project.path" class="block">
          <SectionsPortfolioPreview
            :images="getProjectImages(project)"
            :title="project.title"
            :description="project.description"
          />
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="flex h-64 flex-col items-center justify-center">
        <Icon name="lucide:briefcase" class="h-8 w-8 text-muted" />
        <p class="mt-4 text-muted">No featured projects found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use the new layout
definePageMeta({
  layout: 'new-layout'
});

// Fetch portfolio projects
const { data: portfolioProjects, error, pending, refresh } = await useAsyncData(
  'portfolio-projects',
  () => queryCollection("portfolio").all(),
  {
    transform: (projects) => projects
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    default: () => []
  }
);

// Helper function to extract images from portfolio projects
const getProjectImages = (project) => {
  // Use gallery images if available
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery.map(img => ({
      src: img.src,
      alt: project.title
    }));
  }

  // Fallback to single image if gallery is empty
  if (project.image?.src) {
    return [{ src: project.image.src, alt: project.title }];
  }

  // Default images as final fallback
  const defaultImages = [
    { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: project.title },
    { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: project.title },
    { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: project.title },
  ];

  return defaultImages;
};
</script>
