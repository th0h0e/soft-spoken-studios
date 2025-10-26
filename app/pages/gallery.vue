<template>
  <UiContainer>
    <!-- Photo Grid -->
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
