<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div v-if="images.length > 0" class="overflow-hidden rounded-lg">
      <UiAspectRatio :ratio="16 / 9">
        <NuxtImg
          :src="images[currentIndex].src"
          :alt="images[currentIndex].alt"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </UiAspectRatio>
    </div>

    <!-- Thumbnails / Navigation -->
    <div v-if="images.length > 1" class="grid grid-cols-3 gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentIndex = index"
        class="overflow-hidden rounded transition-opacity hover:opacity-75"
        :class="{ 'ring-2 ring-primary': index === currentIndex }"
      >
        <UiAspectRatio :ratio="16 / 9">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="h-full w-full object-cover"
            width="200"
            height="112"
          />
        </UiAspectRatio>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every(img => img.src && img.alt)
    }
  }
})

const currentIndex = ref(0)
</script>
