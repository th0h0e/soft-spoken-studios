<script setup lang="ts">
/**
 * ProjectGallery - Frontmatter Gallery Component
 *
 * Automatically displays the gallery images from the page's frontmatter.
 * No props needed - it pulls from the `gallery` field in frontmatter.
 *
 * Usage in MDC markdown:
 * ::project-gallery
 * ::
 */

const route = useRoute()

// Fetch the current project page data to get the gallery from frontmatter
const { data: page } = await useAsyncData(`gallery-${route.path}`, () =>
  queryCollection('projects').path(route.path).first()
)

const images = computed<string[]>(() => page.value?.gallery || [])
const tags = computed<string[]>(() => page.value?.tags || [])
const date = computed(() => page.value?.date)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

const currentIndex = ref(0)
</script>

<template>
  <div
    v-if="images && images.length > 0"
    class="space-y-4"
  >
    <!-- Tags and Date -->
    <div
      v-if="tags.length > 0 || date"
      class="flex flex-wrap gap-2"
    >
      <UBadge
        v-if="date"
        color="neutral"
        variant="subtle"
        :label="formatDate(date)"
      />
      <UBadge
        v-for="tag in tags"
        :key="tag"
        color="neutral"
        variant="subtle"
      >
        {{ tag }}
      </UBadge>
    </div>

    <!-- Main Image -->
    <div class="overflow-hidden rounded-lg aspect-16/10">
      <NuxtImg
        :src="images[currentIndex]"
        :alt="`Gallery image ${currentIndex + 1}`"
        class="w-full h-full object-cover object-center"
        fit="cover"
        width="800"
        height="500"
      />
    </div>

    <!-- Thumbnails / Navigation -->
    <div
      v-if="images.length > 1"
      class="grid grid-cols-4 gap-1.5"
    >
      <UButton
        v-for="(image, index) in images"
        :key="index"
        :active="index === currentIndex"
        variant="soft"
        :ui="{ base: 'overflow-hidden rounded transition-opacity p-0 h-auto' }"
        class="overflow-hidden rounded aspect-16/10"
        :class="{
          'ring-1 ring-primary': index === currentIndex,
          'opacity-50 hover:opacity-75': index !== currentIndex,
          'hover:opacity-95': index === currentIndex
        }"
        @click="currentIndex = index"
      >
        <NuxtImg
          :src="image"
          :alt="`Gallery thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
          fit="cover"
          width="160"
          height="100"
        />
      </UButton>
    </div>
  </div>
</template>
