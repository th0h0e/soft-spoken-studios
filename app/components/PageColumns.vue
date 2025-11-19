<script setup lang="ts">
defineProps<{
  items?: Array<{
    image: string
    quote: string
  }>
}>()

const paddingClasses = ['mb-6', 'mb-8', 'mb-12', 'mb-16', 'mb-20', 'mb-24', 'mb-28', 'mb-32', 'mb-36', 'mb-40', 'mb-44', 'mb-48', 'mb-52']

const getRandomPaddingForItem = (index: number) => {
  // Use index to seed the random so it's consistent per item
  return paddingClasses[(index * 7) % paddingClasses.length]
}
</script>

<template>
  <UPageColumns>
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="getRandomPaddingForItem(index)"
    >
      <NuxtImg
        :src="item.image"
        alt="Gallery image"
        class="w-full object-cover"
        loading="lazy"
      />
      <p class="mt-4 text-sm text-muted italic">
        "{{ item.quote }}"
      </p>
    </div>
  </UPageColumns>
</template>
