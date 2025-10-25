<template>
  <figure :class="['my-8', alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left']">
    <UiAspectRatio v-if="aspectRatio" :ratio="aspectRatio" class="overflow-hidden rounded-lg">
      <NuxtImg
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :class="['w-full h-full object-cover', { 'shadow-lg': shadow }]"
      />
    </UiAspectRatio>
    <NuxtImg
      v-else
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="['rounded-lg', size === 'sm' ? 'w-1/2' : size === 'lg' ? 'w-full' : 'w-3/4', { 'shadow-lg': shadow }, alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : '']"
    />
    <figcaption
      v-if="caption"
      class="mt-3 text-sm text-muted-foreground"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
/**
 * BlogImage - Custom image component with caption and styling
 *
 * Usage in Markdown:
 * ::blog-image
 * ---
 * src: /images/my-photo.jpg
 * alt: Beautiful mountain landscape
 * caption: The view from Mount Everest
 * shadow: true
 * aspectRatio: 16/9
 * size: lg
 * alignment: center
 * ---
 * ::
 */

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 600,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  aspectRatio: {
    type: Number,
    default: 0,
    // e.g., 16/9, 4/3, 1/1
  },
  size: {
    type: String,
    default: 'md',
    // Supports: sm, md, lg
  },
  alignment: {
    type: String,
    default: 'center',
    // Supports: left, center, right
  },
})
</script>
