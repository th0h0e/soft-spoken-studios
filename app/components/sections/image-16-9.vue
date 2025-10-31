<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <UiAspectRatio :ratio="16 / 9" class="bg-muted rounded-lg overflow-hidden">
      <NuxtImg
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        width="1600"
        height="900"
      />
    </UiAspectRatio>
    <p v-if="caption" class="mt-4 text-base leading-normal text-muted-foreground italic">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
// Component for 16:9 aspect ratio image
withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
  }>(),
  {
    caption: ''
  }
)
</script>
