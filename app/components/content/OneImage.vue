<script setup lang="ts">
/**
 * OneImage Component - YAML Method MDC Version
 *
 * Displays a single image with optional title and link.
 *
 * Usage in MDC markdown:
 * ::one-image
 * ---
 * src: /path/to/image.jpg
 * alt: Image description
 * title: Optional image title
 * link: /optional-link
 * ---
 * ::
 */

defineProps<{
  src: string
  alt: string
  title?: string
  link?: string
}>()
</script>

<template>
  <UPageSection>
    <USeparator />
    <NuxtLink
      v-if="link"
      :to="link"
      class="block -mt-8"
    >
      <div class="group overflow-hidden rounded-lg aspect-[16/10]">
        <NuxtImg
          :src="src"
          :alt="alt"
          class="w-full h-full object-cover transition-transform group-hover:scale-105"
          fit="cover"
          width="800"
          height="500"
        />
      </div>
      <p
        v-if="title"
        class="mt-4 text-sm text-muted italic text-left"
      >
        {{ title }}
      </p>
    </NuxtLink>
    <div
      v-else
      class="-mt-8"
    >
      <div class="overflow-hidden rounded-lg aspect-[16/10]">
        <NuxtImg
          :src="src"
          :alt="alt"
          class="w-full h-full object-cover"
          fit="cover"
          width="800"
          height="500"
        />
      </div>
      <p
        v-if="title"
        class="mt-4 text-sm text-muted italic text-left"
      >
        {{ title }}
      </p>
    </div>
  </UPageSection>
</template>
