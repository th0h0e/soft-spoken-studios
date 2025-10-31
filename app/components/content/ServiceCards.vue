<template>
  <Motion
    initial="initial"
    in-view="animate"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.12),
        },
      },
    }"
  >
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <slot />
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { stagger } from "motion-v";

/**
 * MDC Component for Nuxt Studio - Service Cards Container
 *
 * Usage in markdown:
 * ::service-cards
 *
 * :::service-card
 * ---
 * image: /path/to/image1.jpg
 * title: Video Production
 * badge: Service
 * icon: feather:play
 * iconLabel: Creative Storytelling
 * ---
 * Description for video production service.
 * :::
 *
 * :::service-card
 * ---
 * image: /path/to/image2.jpg
 * title: Copywriting
 * badge: Writing
 * icon: feather:pen-tool
 * iconLabel: Purposeful Communication
 * ---
 * Description for copywriting service.
 * :::
 *
 * ::
 */
</script>
