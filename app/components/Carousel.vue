<script setup lang="ts">
// Accept images array as a prop
const props = defineProps<{
  images?: string[] // Made optional with fallback
}>()
const items = computed(() => props.images || [])
</script>

<template>
  <UCarousel
    v-if="items.length > 0"
    v-slot="{ item }"
    loop
    class-names
    wheel-gestures
    :autoplay="{ delay: 10000 }"
    :items="items"
    :ui="{
      root: 'p-0',
      viewport: 'p-0',
      item: 'basis-[100%] transition-opacity [&:not(.is-snapped)]:opacity-10'
    }"
  >
    <img
      :src="item"
      class="w-full h-full object-cover aspect-[3/2]"
    >
  </UCarousel>
</template>
