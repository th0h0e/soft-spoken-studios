<script setup lang="ts">
/**
 * OneImage MDC Component
 *
 * Displays a single image with 16:10 aspect ratio.
 * Can be used in Markdown files with MDC syntax.
 *
 * Usage in Markdown:
 * ::one-image
 * ---
 * src: /images/image.jpg
 * alt: Image description
 * title: Optional caption
 * link: /optional-link
 * ---
 * ::
 */

defineProps<{
  src?: string
  alt?: string
  title?: string
  link?: string
}>()
</script>

<template>
  <div class="my-8">
    <USeparator class="mb-6" />
    <NuxtLink
      v-if="link"
      :to="link"
      class="block"
    >
      <div class="group overflow-hidden rounded-lg aspect-[16/10]">
        <NuxtImg
          :src="src"
          :alt="alt || 'Image'"
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
    <div v-else>
      <div class="overflow-hidden rounded-lg aspect-[16/10]">
        <NuxtImg
          :src="src"
          :alt="alt || 'Image'"
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
  </div>
</template>
