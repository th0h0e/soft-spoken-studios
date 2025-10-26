<template>
  <UiContainer>
    <!-- Photo Grid -->
    <div class="mb-12">
      <Gallery :gallery-data="galleryData" />
    </div>
  </UiContainer>
</template>

<script setup>
import type { Collections } from "@nuxt/content";

// Fetch gallery data from data collection
const { data: galleryData } = await useAsyncData(
  'gallery-data',
  async () => {
    return await queryCollection("gallery" as keyof Collections).first();
  },
  {
    default: () => ({ items: [] })
  }
);
</script>
