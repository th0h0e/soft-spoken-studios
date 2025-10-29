<template>
  <div>
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="1" class="bg-muted rounded-lg overflow-hidden">
      <img
        src="/images/3334f4a0741954580a818e303927dfcd.jpg"
        alt="Image 1:1"
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
// Component for 1:1 aspect ratio image (square)
</script>
