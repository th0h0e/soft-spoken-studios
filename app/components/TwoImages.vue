<script setup lang="ts">
/**
 * TwoImages Component for Nuxt Studio
 *
 * Displays exactly 2 images in a responsive 2-column grid with 4:5 aspect ratio.
 * Data is sourced from content/TwoImages.yml and edited via Nuxt Studio
 */

defineProps<{
  page: {
    twoimages: {
      links?: {
        to: string
      }
      images: Array<{
        src: string
        alt: string
        title?: string
        link?: string
      }>
    }
  }
}>()
</script>

<template>
  <div class="pb-8">
    <USeparator class="mb-6" />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Loop through images (max 2) -->
      <NuxtLink
        v-for="(image, index) in page.twoimages?.images?.slice(0, 2)"
        :key="index"
        :to="image.link || '#'"
        :class="{ 'pointer-events-none': !image.link }"
      >
        <div class="group cursor-pointer">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="aspect-4/5 w-full h-auto rounded object-cover transition-opacity group-hover:opacity-90"
            fit="cover"
            width="400"
            height="500"
          />
          <h3
            v-if="image.title"
            class="mt-4 text-sm text-muted italic"
          >
            {{ image.title }}
          </h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Style for slot-based images */
:deep(img) {
  border-radius: 0.5rem;
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
}

:deep(p) {
  margin: 0;
}
</style>
