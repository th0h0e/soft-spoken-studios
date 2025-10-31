<template>
  <SectionsImages :items="items" />
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio
 * Usage in markdown:
 * ::image-grid
 * ---
 * items:
 *   - src: /path/to/image1.jpg
 *     alt: Image description
 *     title: Image title
 *     link: /optional/link
 *   - src: /path/to/image2.jpg
 *     alt: Another image
 *     title: Another title
 * ---
 * ::
 */

interface ImageItem {
  src: string
  alt: string
  title: string
  link?: string
}

withDefaults(
  defineProps<{
    items?: ImageItem[]
  }>(),
  {
    items: () => []
  }
)
</script>
