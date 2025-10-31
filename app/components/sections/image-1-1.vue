<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="1" class="bg-muted rounded-lg overflow-hidden">
      <NuxtImg
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        width="1000"
        height="1000"
      />
    </UiAspectRatio>
    <div v-if="captionLeft || captionRight" class="flex gap-4 mt-4">
      <p v-if="captionLeft" class="w-1/3 text-base leading-normal text-muted-foreground italic">{{ captionLeft }}</p>
      <p v-if="captionRight" class="w-2/3 text-base leading-normal text-muted-foreground italic">{{ captionRight }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component for 1:1 aspect ratio image (square)
withDefaults(
  defineProps<{
    src: string
    alt: string
    captionLeft?: string
    captionRight?: string
  }>(),
  {
    captionLeft: '',
    captionRight: ''
  }
)
</script>
