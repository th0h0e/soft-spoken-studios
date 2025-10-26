<template>
  <div class="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <template v-for="(item, index) in visibleItems" :key="index">
      <div :class="getLayoutClass(index)">
        <UiAspectRatio :ratio="getAspectRatio(index)" class="bg-muted mb-2 overflow-hidden rounded-lg">
          <NuxtImg
            :src="item.image.src"
            :alt="item.image.alt || 'Gallery image'"
            class="h-full w-full object-cover"
            :width="getImageWidth(index)"
            :height="getImageHeight(index)"
          />
        </UiAspectRatio>
        <p v-if="item.caption" class="text-muted-foreground text-xs">{{ item.caption }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  galleryData: {
    type: Object,
    default: () => ({ items: [] })
  }
});

const items = computed(() => props.galleryData?.items || []);

// Filter out items without images
const visibleItems = computed(() => {
  return items.value.filter(item => item.image?.src && item.image.src.trim() !== '');
});

// Layout pattern that repeats throughout the gallery
// Pattern: tall portrait, square, wide landscape, square, tall portrait, square, horizontal rect, square, vertical, wide landscape, square, tall portrait, square, wide landscape, square, vertical, horizontal rect, square, tall portrait
const layoutPattern = [
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },      // 0: Tall portrait
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 1: Square
  { ratio: 16/9, class: 'col-span-2', width: 800, height: 450 },      // 2: Wide landscape
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 3: Square
  { ratio: 2/3, class: 'row-span-2', width: 400, height: 600 },       // 4: Tall portrait
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 5: Square
  { ratio: 4/3, class: 'col-span-2', width: 800, height: 600 },       // 6: Horizontal rect
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 7: Square
  { ratio: 3/4, class: '', width: 400, height: 533 },                 // 8: Vertical rect
  { ratio: 16/10, class: 'col-span-2', width: 800, height: 500 },     // 9: Wide landscape
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 10: Square
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },       // 11: Tall portrait
  { ratio: 1/1, class: '', width: 800, height: 450 },                 // 12: Square
  { ratio: 16/9, class: 'col-span-2', width: 400, height: 400 },      // 13: Wide landscape
  { ratio: 1/1, class: '', width: 400, height: 600 },                 // 14: Square
  { ratio: 2/3, class: '', width: 400, height: 400 },                 // 15: Vertical rect
  { ratio: 4/3, class: 'col-span-2', width: 800, height: 600 },       // 16: Horizontal rect
  { ratio: 1/1, class: '', width: 400, height: 400 },                 // 17: Square
  { ratio: 3/4, class: 'row-span-2', width: 400, height: 533 },       // 18: Tall portrait
];

const getLayoutClass = (index) => {
  const patternIndex = index % layoutPattern.length;
  return layoutPattern[patternIndex].class;
};

const getAspectRatio = (index) => {
  const patternIndex = index % layoutPattern.length;
  return layoutPattern[patternIndex].ratio;
};

const getImageWidth = (index) => {
  const patternIndex = index % layoutPattern.length;
  return layoutPattern[patternIndex].width;
};

const getImageHeight = (index) => {
  const patternIndex = index % layoutPattern.length;
  return layoutPattern[patternIndex].height;
};
</script>
