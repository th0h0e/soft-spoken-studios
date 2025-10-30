<template>
  <div class="space-y-8">
    <SectionsTypography />

    <!-- YouTube Video Component -->
    <div>
      <h2 class="mb-6 text-2xl font-semibold">Video Player</h2>
      <YouTubeVideo
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        caption="Example video player component"
      />
    </div>
  </div>
</template>

<script setup>
import { SectionsTypography } from '#components'

definePageMeta({
  layout: 'new-layout'
});
</script>
