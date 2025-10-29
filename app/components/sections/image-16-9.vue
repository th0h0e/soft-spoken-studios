<template>
  <div>
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="16 / 9" class="bg-muted rounded-lg overflow-hidden">
      <img
        src="/images/0cb12b5fba26e02dec8f0ab5f325c334.jpg"
        alt="Image 16:9"
        class="w-full h-full object-cover"
      />
    </UiAspectRatio>
    <div class="flex gap-4 mt-4">
      <p class="w-1/2 text-base text-foreground leading-relaxed">Featured visual content</p>
      <p class="w-1/2 text-base text-foreground leading-relaxed">High-quality imagery selection</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component for 16:9 aspect ratio image
</script>
