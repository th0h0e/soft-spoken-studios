<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="1" class="bg-muted rounded-lg overflow-hidden">
      <slot mdc-unwrap="p" />
    </UiAspectRatio>
    <div v-if="$slots.captionLeft || $slots.captionRight" class="flex gap-4 mt-4">
      <p v-if="$slots.captionLeft" class="w-1/3 text-base leading-normal text-muted-foreground italic">
        <slot name="captionLeft" mdc-unwrap="p" />
      </p>
      <p v-if="$slots.captionRight" class="w-2/3 text-base leading-normal text-muted-foreground italic">
        <slot name="captionRight" mdc-unwrap="p" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * MDC Component for Nuxt Studio - 1:1 Aspect Ratio Image (Square, Slot-based)
 *
 * Usage in markdown:
 * ::image-box
 * ![Alt text](/path/to/image.jpg)
 * #captionLeft
 * Left caption text
 * #captionRight
 * Right caption with more details
 * ::
 *
 * This version uses slots, making it easier to insert images via Nuxt Studio's media picker
 */
</script>
