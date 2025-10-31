<template>
  <SectionsImage-1-1 :src="src" :alt="alt" :caption-left="captionLeft" :caption-right="captionRight" />
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio - 1:1 Aspect Ratio Image (Square)
 * Usage in markdown:
 * ::image-square
 * ---
 * src: /path/to/image.jpg
 * alt: Image description
 * captionLeft: Optional left caption
 * captionRight: Optional right caption
 * ---
 * ::
 */

withDefaults(
  defineProps<{
    src: string
    alt: string
    captionLeft?: string
    captionRight?: string
  }>(),
  {
    captionLeft: '',
    captionRight: ''
  }
)
</script>
