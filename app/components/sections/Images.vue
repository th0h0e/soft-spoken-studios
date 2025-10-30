<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Gallery Items -->
      <NuxtLink v-for="(item, index) in items" :key="index" :to="item.link || '#'" :class="{ 'pointer-events-none': !item.link }">
        <div class="group cursor-pointer">
          <UiAspectRatio :ratio="4 / 5">
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              class="h-full w-full rounded object-cover transition-opacity group-hover:opacity-90"
              width="400"
              height="500"
            />
          </UiAspectRatio>
          <h3 class="mt-4 text-sm text-muted-foreground italic">{{ item.title }}</h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ImageItem {
  src: string
  alt: string
  title: string
  link?: string
}

defineProps<{
  items: ImageItem[]
}>();
</script>
