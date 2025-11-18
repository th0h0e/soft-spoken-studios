<script setup lang="ts">
defineProps<{
  items?: Array<{
    image: string
    quote: string
  }>
}>()
</script>

<template>
  <UPageColumns>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mb-8"
    >
      <NuxtImg
        :src="item.image"
        alt="Gallery image"
        class="w-full rounded object-cover"
        loading="lazy"
      />
      <p class="mt-4 text-sm text-muted italic">
        "{{ item.quote }}"
      </p>
    </div>
  </UPageColumns>
</template>
