<template>
  <SectionsImage-16-9 :src="src" :alt="alt" :caption="caption" />
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio - 16:9 Aspect Ratio Image
 * Usage in markdown:
 * ::image-16x9
 * ---
 * src: /path/to/image.jpg
 * alt: Image description
 * caption: Optional caption text
 * ---
 * ::
 */

withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
  }>(),
  {
    caption: ''
  }
)
</script>
