<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio - Simple Image Gallery (Slot-based)
 *
 * Usage in markdown:
 * ::image-gallery
 * ![Image 1](/path/to/image1.jpg)
 * ![Image 2](/path/to/image2.jpg)
 * ![Image 3](/path/to/image3.jpg)
 * ![Image 4](/path/to/image4.jpg)
 * ::
 *
 * This version uses slots, making it easier to insert multiple images via Nuxt Studio's media picker.
 * Images will be displayed in a responsive 2-column grid.
 */
</script>

<style scoped>
:deep(img) {
  @apply rounded object-cover w-full h-full;
  aspect-ratio: 4 / 5;
}

:deep(p) {
  @apply m-0;
}
</style>
