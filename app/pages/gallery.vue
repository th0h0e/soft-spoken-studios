<template>
  <div class="mb-12">
    <Gallery :gallery-data="galleryData" />
  </div>
</template>

<script setup>
// Use the new layout
definePageMeta({
  layout: 'new-layout'
});

// Fetch gallery data from data collection
const { data: galleryData } = await useAsyncData(
  'gallery-data',
  async () => {
    return await queryCollection("gallery").first();
  },
  {
    default: () => ({ items: [] })
  }
);
</script>
