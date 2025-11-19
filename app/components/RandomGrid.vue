<script setup lang="ts">
const props = defineProps<{
  items?: Array<{
    image: string
    quote: string
  }>
}>()

const gridSpans = computed(() => {
  return props.items?.map((_, index) => ({
    colSpan: (index % 3) + 1,  // 1-3 columns
    rowSpan: (index % 2) + 1   // 1-2 rows
  })) || []
})
</script>

<template>
  <div class="grid grid-cols-6 gap-4 auto-rows-[250px]">
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="{
        gridColumn: `span ${gridSpans[index].colSpan}`,
        gridRow: `span ${gridSpans[index].rowSpan}`
      }"
      class="overflow-hidden rounded"
    >
      <div class="grid grid-cols-1 grid-rows-[auto_auto]">
        <NuxtImg
          :src="item.image"
          alt="Gallery image"
          class="w-full object-cover"
          loading="lazy"
        />
        <p class="p-4 text-sm text-muted italic bg-default text-left">
          "{{ item.quote }}"
        </p>
      </div>
    </div>
  </div>
</template>
