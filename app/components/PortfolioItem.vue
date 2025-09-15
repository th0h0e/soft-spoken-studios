<template>
  <div>
    <UiCarousel class="w-full">
      <UiCarouselContent>
        <UiCarouselItem v-for="(image, index) in images" :key="index">
          <div class="p-1">
            <UiAspectRatio :ratio="16/9" class="rounded overflow-hidden bg-muted">
              <NuxtImg
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-cover"
                width="800"
                height="450"
              />
            </UiAspectRatio>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
    </UiCarousel>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  }
})
</script>