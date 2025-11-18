<script setup lang="ts">
import { ref } from 'vue'

/**
 * ProjectGallery MDC Component
 *
 * Displays project images in an interactive gallery with 16:10 aspect ratio.
 * Features a main image viewer with thumbnail navigation.
 * Can be used in Markdown files with MDC syntax.
 *
 * Usage in Markdown:
 * ::project-gallery
 * ---
 * images:
 *   - /images/project1.jpg
 *   - /images/project2.jpg
 *   - /images/project3.jpg
 *   - /images/project4.jpg
 * ---
 * ::
 */

defineProps<{
  images?: string[]
}>()

const currentIndex = ref(0)
</script>

<template>
  <div
    v-if="images && images.length > 0"
    class="space-y-2"
  >
    <!-- Main Image -->
    <div class="overflow-hidden rounded-lg aspect-[16/10]">
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
        :ui="{ base: 'overflow-hidden rounded transition-opacity hover:opacity-75 p-0 h-auto' }"
        class="overflow-hidden rounded aspect-[16/10]"
        :class="{ 'ring-1 ring-primary': index === currentIndex }"
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
