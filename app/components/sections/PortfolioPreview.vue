<template>
  <div class="grid gap-4 md:grid-cols-2">
    <!-- Left: Carousel -->
    <div>
      <UiCarousel
        class="group relative w-full"
        :plugins="[Autoplay({ delay: 3000, stopOnInteraction: true })]"
      >
        <UiCarouselContent>
          <UiCarouselItem
            v-for="(image, index) in images"
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
        <UiCarouselPrevious class="left-4 opacity-0 transition-opacity group-hover:opacity-100" />
        <UiCarouselNext class="right-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </UiCarousel>
    </div>

    <!-- Right: Project Info -->
    <div class="flex items-start">
      <SideCard class="cursor-pointer w-full">
        <template #title>{{ title }}</template>
        <template #content>{{ description }}</template>
      </SideCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";

defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => Array.isArray(value) && value.length > 0
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>
