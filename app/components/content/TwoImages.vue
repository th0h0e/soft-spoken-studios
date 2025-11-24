<script setup lang="ts">
/**
 * TwoImages MDC Component
 *
 * Displays exactly 2 images in a responsive 2-column grid with 4:5 aspect ratio.
 * Can be used in Markdown files with MDC syntax.
 *
 * Usage in Markdown:
 * ::two-images
 * ---
 * images:
 *   - src: /images/image1.jpg
 *     alt: Image 1 description
 *     title: Optional title
 *     link: /optional-link
 *   - src: /images/image2.jpg
 *     alt: Image 2 description
 *     title: Optional title
 *     link: /optional-link
 * ---
 * ::
 */

defineProps<{
  images?: Array<{
    src: string
    alt: string
    title?: string
    link?: string
  }>
}>()
</script>

<template>
  <UPageSection>
    <USeparator />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 -mt-8">
      <!-- Loop through images (max 2) -->
      <template
        v-for="(image, index) in images?.slice(0, 2)"
        :key="index"
      >
        <!-- With link -->
        <NuxtLink
          v-if="image.link"
          :to="image.link"
          :aria-label="image.alt"
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
              class="mt-4 text-xs text-muted italic"
            >
              {{ image.title }}
            </h3>
          </div>
        </NuxtLink>
        <!-- Without link -->
        <div
          v-else
          class="group"
        >
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="aspect-4/5 w-full h-auto rounded object-cover"
            fit="cover"
            width="400"
            height="500"
          />
          <h3
            v-if="image.title"
            class="mt-4 text-xs text-muted italic"
          >
            {{ image.title }}
          </h3>
        </div>
      </template>
    </div>
  </UPageSection>
</template>

<style scoped>
/* Style for slot-based images */
:deep(img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
}

:deep(p) {
  margin: 0;
}
</style>
