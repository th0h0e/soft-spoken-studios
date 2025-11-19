<script setup lang="ts">
const props = defineProps<{
  items?: Array<{
    image: string
    quote: string
  }>
}>()

const gridSpans = computed(() => {
  return props.items?.map((_, index) => ({
    colSpan: (index % 3) + 1,
    rowSpan: (index % 2) + 1
  })) || []
})
</script>

<template>
  <div class="grid grid-cols-6 gap-4 auto-rows-[minmax(250px,auto)]">
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
        <p class="px-0 py-4 text-xs text-muted italic bg-default text-left">
          "{{ item.quote }}"
        </p>
      </div>
    </div>
  </div>
</template>
