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
    :autoplay="{ delay: 4800 }"
    :items="items"
    :ui="{ item: 'basis-1/2' }"
  >
    <img
      :src="item"
      width="416"
      height="234"
      class="rounded-lg"
    >
  </UCarousel>
</template>
