<template>
  <UiContainer class="md:!px-0">
    <!-- Photo Grid (full width in 10-col area) -->
    <div class="mb-12">
      <Gallery :gallery-data="galleryData" />
    </div>
  </UiContainer>
</template>

<script setup>
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
