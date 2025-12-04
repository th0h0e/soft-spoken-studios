<template>
  <div class="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <template
      v-for="(item, index) in visibleItems"
      :key="index"
    >
      <div :class="getLayoutClass(index)">
        <div
          :style="{ aspectRatio: getAspectRatio(index) }"
          class="bg-elevated mb-2 overflow-hidden"
        >
          <NuxtImg
            :src="item.image"
            alt="Gallery image"
            class="h-full w-full object-cover"
            :width="getImageWidth(index)"
            :height="getImageHeight(index)"
          />
        </div>
        <p
          v-if="item.caption"
          class="text-muted text-xs pb-4"
        >
          {{ item.caption }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items?: Array<{
    image: string
    caption: string
  }>
}>()

// Filter out items without images
const visibleItems = computed(() => {
  return props.items?.filter(item => item.image && item.image.trim() !== '') || []
})

// Layout pattern that repeats throughout the gallery
// Pattern: tall portrait, square, wide landscape, square, tall portrait, square, horizontal rect, square, vertical, wide landscape, square, tall portrait, square, wide landscape, square, vertical, horizontal rect, square, tall portrait
const layoutPattern: Array<{ ratio: number, class: string, width: number, height: number }> = [
  { ratio: 3 / 4, class: 'row-span-2', width: 400, height: 533 }, // 0: Tall portrait
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 1: Square
  { ratio: 16 / 9, class: 'col-span-2', width: 800, height: 450 }, // 2: Wide landscape
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 3: Square
  { ratio: 2 / 3, class: 'row-span-2', width: 400, height: 600 }, // 4: Tall portrait
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 5: Square
  { ratio: 4 / 3, class: 'col-span-2', width: 800, height: 600 }, // 6: Horizontal rect
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 7: Square
  { ratio: 3 / 4, class: '', width: 400, height: 533 }, // 8: Vertical rect
  { ratio: 16 / 10, class: 'col-span-2', width: 800, height: 500 }, // 9: Wide landscape
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 10: Square
  { ratio: 3 / 4, class: 'row-span-2', width: 400, height: 533 }, // 11: Tall portrait
  { ratio: 1 / 1, class: '', width: 800, height: 450 }, // 12: Square
  { ratio: 16 / 9, class: 'col-span-2', width: 400, height: 400 }, // 13: Wide landscape
  { ratio: 1 / 1, class: '', width: 400, height: 600 }, // 14: Square
  { ratio: 2 / 3, class: '', width: 400, height: 400 }, // 15: Vertical rect
  { ratio: 4 / 3, class: 'col-span-2', width: 800, height: 600 }, // 16: Horizontal rect
  { ratio: 1 / 1, class: '', width: 400, height: 400 }, // 17: Square
  { ratio: 3 / 4, class: 'row-span-2', width: 400, height: 533 } // 18: Tall portrait
]

const getLayoutClass = (index: number): string => {
  const patternIndex = index % layoutPattern.length
  return layoutPattern[patternIndex]?.class || ''
}

const getAspectRatio = (index: number): number => {
  const patternIndex = index % layoutPattern.length
  return layoutPattern[patternIndex]?.ratio || 1
}

const getImageWidth = (index: number): number => {
  const patternIndex = index % layoutPattern.length
  return layoutPattern[patternIndex]?.width || 400
}

const getImageHeight = (index: number): number => {
  const patternIndex = index % layoutPattern.length
  return layoutPattern[patternIndex]?.height || 400
}
</script>
