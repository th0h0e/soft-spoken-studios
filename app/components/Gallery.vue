<template>
  <div class="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <template v-for="(item, index) in visibleItems" :key="index">
      <!-- Only render if image src is present -->
      <div :class="getLayoutClasses(item.layout)">
        <UiAspectRatio :ratio="getAspectRatio(item.layout)" class="bg-muted mb-2 overflow-hidden rounded-lg">
          <NuxtImg
            :src="item.image.src"
            :alt="item.image.alt || 'Gallery image'"
            class="h-full w-full object-cover"
            :width="getImageWidth(item.layout)"
            :height="getImageHeight(item.layout)"
          />
        </UiAspectRatio>
        <p v-if="item.caption" class="text-muted-foreground text-xs">
          {{ item.caption }}
        </p>
      </div>
    </template>

    <!-- Empty State -->
    <div v-if="visibleItems.length === 0" class="col-span-full py-16 text-center">
      <Icon name="lucide:image" class="mx-auto h-12 w-12 text-muted" />
      <p class="text-muted mt-4">No gallery images yet. Add images via Nuxt Studio Data section.</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  galleryData: {
    type: Object,
    default: () => ({ items: [] })
  }
});

// Filter out items without images
const visibleItems = computed(() => {
  if (!props.galleryData?.items) return [];
  return props.galleryData.items.filter(item => item.image?.src && item.image.src.trim() !== '');
});

// Get layout classes based on layout type
const getLayoutClasses = (layout) => {
  const layoutMap = {
    'square': '',
    'portrait-tall': 'row-span-2',
    'portrait': '',
    'landscape-wide': 'col-span-2',
    'landscape': 'col-span-2',
    'vertical': '',
  };
  return layoutMap[layout] || '';
};

// Get aspect ratio based on layout type
const getAspectRatio = (layout) => {
  const ratioMap = {
    'square': 1 / 1,
    'portrait-tall': 3 / 4,
    'portrait': 3 / 4,
    'landscape-wide': 16 / 9,
    'landscape': 4 / 3,
    'vertical': 2 / 3,
  };
  return ratioMap[layout] || 1 / 1;
};

// Get image width for optimization
const getImageWidth = (layout) => {
  const widthMap = {
    'square': 400,
    'portrait-tall': 400,
    'portrait': 400,
    'landscape-wide': 800,
    'landscape': 800,
    'vertical': 400,
  };
  return widthMap[layout] || 400;
};

// Get image height for optimization
const getImageHeight = (layout) => {
  const heightMap = {
    'square': 400,
    'portrait-tall': 533,
    'portrait': 533,
    'landscape-wide': 450,
    'landscape': 600,
    'vertical': 600,
  };
  return heightMap[layout] || 400;
};
</script>
