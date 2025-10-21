<template>
  <div>
    <Header
      headline="Portfolio"
      title="Selected work in copywriting and video production"
      description="A collection of projects that showcase our approach to thoughtful communication and authentic storytelling."
    />

    <UiContainer class="-mt-8 pb-16">
      <div class="grid gap-8 gap-y-4 lg:grid-cols-8">
        <!-- Dynamic Portfolio Items -->
        <template v-for="project in portfolioProjects" :key="project._id">
          <div class="lg:col-span-5">
            <PortfolioItem :images="getProjectImages(project)" />
          </div>
          <div class="flex items-start lg:col-span-3">
            <NuxtLink :to="project.path" class="block w-full">
              <SideCard class="cursor-pointer transition-all hover:bg-accent/50">
                <template #title>{{ project.title }}</template>
                <template #content>{{ project.description }}</template>
              </SideCard>
            </NuxtLink>
          </div>
        </template>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
// Fetch portfolio projects
const { data: portfolioProjects } = await useAsyncData('portfolio-projects', async () => {
  try {
    const projects = await queryCollection("portfolio").all();
    // Sort by date (newest first) and filter for featured projects
    return projects
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error);
    return [];
  }
});

// Helper function to extract images from portfolio projects
const getProjectImages = (project) => {
  // Default images as fallback
  const defaultImages = [
    { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: project.title },
    { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: project.title },
    { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: project.title },
  ];

  return defaultImages;
};
</script>
