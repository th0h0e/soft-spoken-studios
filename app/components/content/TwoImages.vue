<script setup lang="ts">
/**
 * TwoImages Component
 *
 * Displays exactly 2 images in a responsive 2-column grid with 4:5 aspect ratio.
 *
 * Can be used in two ways:
 * 1. With page object: <TwoImages :page="page" /> (uses page.twoimages.images)
 * 2. With direct images prop: <TwoImages :images="[...]" />
 */

const props = defineProps<{
  page?: {
    twoimages?: {
      images?: Array<{
        src: string
        alt: string
        link?: string
      }>
    }
  }
  images?: Array<{
    src: string
    alt: string
    link?: string
  }>
}>()

const displayImages = computed(() => props.page?.twoimages?.images || props.images)
</script>

<template>
  <UPageSection>
    <USeparator />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 -mt-8">
      <!-- Loop through images (max 2) -->
      <template
        v-for="(image, index) in displayImages?.slice(0, 2)"
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
            <h3 class="mt-4 text-xs text-muted italic">
              {{ image.alt }}
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
          <h3 class="mt-4 text-xs text-muted italic">
            {{ image.alt }}
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
