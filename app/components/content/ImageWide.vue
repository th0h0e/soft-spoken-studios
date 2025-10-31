<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="16 / 9" class="bg-muted rounded-lg overflow-hidden">
      <slot mdc-unwrap="p" />
    </UiAspectRatio>
    <div v-if="$slots.caption" class="mt-4 text-base leading-normal text-muted-foreground italic">
      <slot name="caption" mdc-unwrap="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio - 16:9 Aspect Ratio Image (Slot-based)
 *
 * Usage in markdown:
 * ::image-wide
 * ![Alt text](/path/to/image.jpg)
 * #caption
 * Your caption text here
 * ::
 *
 * This version uses slots, making it easier to insert images via Nuxt Studio's media picker
 */
</script>
