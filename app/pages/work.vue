<template>
  <div>
    <Header
      headline="Portfolio"
      title="Selected work in copywriting and video production"
      description="A collection of projects that showcase our approach to thoughtful communication and authentic storytelling."
    />

    <UiContainer class="-mt-8 pb-16">
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

      <!-- Portfolio Grid -->
      <div v-else-if="portfolioProjects?.length" class="grid gap-8 gap-y-4 lg:grid-cols-8">
        <!-- Dynamic Portfolio Items -->
        <template v-for="project in portfolioProjects" :key="project._id">
          <div class="lg:col-span-5">
            <!-- Carousel for Portfolio Images -->
            <UiCarousel
              class="relative w-full"
              :plugins="[Autoplay({ delay: 3000, stopOnInteraction: true })]"
            >
              <UiCarouselContent>
                <UiCarouselItem
                  v-for="(image, index) in getProjectImages(project)"
                  :key="index"
                  grab-cursor
                >
                  <div class="overflow-hidden rounded-lg">
                    <UiAspectRatio :ratio="16 / 9">
                      <NuxtImg
                        :src="image.src"
                        :alt="image.alt"
                        class="h-full w-full object-cover"
                        width="800"
                        height="450"
                      />
                    </UiAspectRatio>
                  </div>
                </UiCarouselItem>
              </UiCarouselContent>
              <UiCarouselPrevious class="left-4" />
              <UiCarouselNext class="right-4" />
            </UiCarousel>
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

      <!-- Empty State -->
      <div v-else class="flex h-64 flex-col items-center justify-center">
        <Icon name="lucide:briefcase" class="h-8 w-8 text-muted" />
        <p class="mt-4 text-muted">No featured projects found.</p>
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";

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
