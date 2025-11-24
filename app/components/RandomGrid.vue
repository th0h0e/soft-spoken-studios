<script setup lang="ts">
const props = defineProps<{
  items?: Array<{
    image: string
    caption: string
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
        gridColumn: `span ${gridSpans[index]?.colSpan ?? 1}`,
        gridRow: `span ${gridSpans[index]?.rowSpan ?? 1}`
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
        <div class="px-0 py-4 bg-default text-left">
          <p class="text-sm text-default">
            {{ item.caption }}
          </p>
          <p class="text-xs text-muted italic mt-1">
            — {{ item.quote }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
