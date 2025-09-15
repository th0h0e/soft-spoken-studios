<script setup>
// Set page head
useHead({
  title: 'Gallery'
})

const { locale } = useI18n()

// Get portfolio items with images for gallery
const { data: portfolioItems } = await useAsyncData(`gallery-${locale.value}`, async () => {
  const collection = `portfolio_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
})

// Filter items that have images
const galleryItems = computed(() => {
  if (!portfolioItems.value) return []
  return portfolioItems.value
    .filter(item => item.image)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div>
    <UiContainer>
      <!-- Header -->
      <div class="text-center py-16">
        <h1 class="text-4xl font-bold mb-4">Gallery</h1>
        <p class="text-xl text-muted">Visual stories from our projects</p>
      </div>

      <!-- Gallery Grid -->
      <div v-if="galleryItems.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
        <div
          v-for="item in galleryItems"
          :key="item._path"
          class="group relative aspect-square overflow-hidden rounded-lg bg-muted"
        >
          <NuxtLink :to="item._path" class="block w-full h-full">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="text-center text-white p-4">
                  <h3 class="font-semibold mb-1">{{ item.title }}</h3>
                  <p v-if="item.client" class="text-sm opacity-80">{{ item.client }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-semibold mb-4">Gallery coming soon</h2>
        <p class="text-muted">We're building our visual portfolio. Check back soon!</p>
      </div>
    </UiContainer>
  </div>
</template>