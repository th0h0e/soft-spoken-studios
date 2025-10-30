<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="1" class="bg-muted rounded-lg overflow-hidden">
      <img
        src="/images/3334f4a0741954580a818e303927dfcd.jpg"
        alt="Image 1:1"
        class="w-full h-full object-cover"
      />
    </UiAspectRatio>
    <div class="flex gap-4 mt-4">
      <p class="w-1/3 text-base leading-normal text-muted-foreground italic">Featured visual content</p>
      <p class="w-2/3 text-base leading-normal text-muted-foreground italic">High-quality imagery selection</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component for 1:1 aspect ratio image (square)
</script>
