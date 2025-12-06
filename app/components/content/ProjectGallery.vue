<script setup lang="ts">
/**
 * ProjectGallery Component - YAML Method MDC Version
 *
 * Displays a gallery with main image and thumbnail navigation.
 *
 * Usage in MDC markdown:
 * ::project-gallery
 * ---
 * images:
 *   - /path/to/image1.jpg
 *   - /path/to/image2.jpg
 *   - /path/to/image3.jpg
 * ---
 * ::
 */

import { ref } from 'vue'

defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)
</script>

<template>
  <div
    v-if="images && images.length > 0"
    class="space-y-2"
  >
    <!-- Main Image -->
    <div class="overflow-hidden rounded-lg aspect-16/10">
      <NuxtImg
        :src="images[currentIndex]"
        :alt="`Gallery image ${currentIndex + 1}`"
        class="w-full h-full object-cover object-center"
        fit="cover"
        width="800"
        height="500"
      />
    </div>

    <!-- Thumbnails / Navigation -->
    <div
      v-if="images.length > 1"
      class="grid grid-cols-4 gap-1.5"
    >
      <UButton
        v-for="(image, index) in images"
        :key="index"
        :active="index === currentIndex"
        variant="soft"
        :ui="{ base: 'overflow-hidden rounded transition-opacity p-0 h-auto' }"
        class="overflow-hidden rounded aspect-16/10"
        :class="{
          'ring-1 ring-primary': index === currentIndex,
          'opacity-50 hover:opacity-75': index !== currentIndex,
          'hover:opacity-95': index === currentIndex
        }"
        @click="currentIndex = index"
      >
        <NuxtImg
          :src="image"
          :alt="`Gallery thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
          fit="cover"
          width="160"
          height="100"
        />
      </UButton>
    </div>
  </div>
</template>
