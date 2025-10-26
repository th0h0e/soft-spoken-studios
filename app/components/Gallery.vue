<template>
  <div class="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <!-- Item 1: Tall portrait -->
    <div v-if="items[0]?.image?.src" class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[0].image.src"
          :alt="items[0].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p v-if="items[0].caption" class="text-muted-foreground text-xs">{{ items[0].caption }}</p>
    </div>

    <!-- Item 2: Square -->
    <div v-if="items[1]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[1].image.src"
          :alt="items[1].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[1].caption" class="text-muted-foreground text-xs">{{ items[1].caption }}</p>
    </div>

    <!-- Item 3: Wide landscape -->
    <div v-if="items[2]?.image?.src" class="col-span-2">
      <UiAspectRatio :ratio="16 / 9" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[2].image.src"
          :alt="items[2].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </UiAspectRatio>
      <p v-if="items[2].caption" class="text-muted-foreground text-xs">{{ items[2].caption }}</p>
    </div>

    <!-- Item 4: Square -->
    <div v-if="items[3]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[3].image.src"
          :alt="items[3].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[3].caption" class="text-muted-foreground text-xs">{{ items[3].caption }}</p>
    </div>

    <!-- Item 5: Tall portrait -->
    <div v-if="items[4]?.image?.src" class="row-span-2">
      <UiAspectRatio :ratio="2 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[4].image.src"
          :alt="items[4].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="600"
        />
      </UiAspectRatio>
      <p v-if="items[4].caption" class="text-muted-foreground text-xs">{{ items[4].caption }}</p>
    </div>

    <!-- Item 6: Square -->
    <div v-if="items[5]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[5].image.src"
          :alt="items[5].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[5].caption" class="text-muted-foreground text-xs">{{ items[5].caption }}</p>
    </div>

    <!-- Item 7: Horizontal rectangle -->
    <div v-if="items[6]?.image?.src" class="col-span-2">
      <UiAspectRatio :ratio="4 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[6].image.src"
          :alt="items[6].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="800"
          height="600"
        />
      </UiAspectRatio>
      <p v-if="items[6].caption" class="text-muted-foreground text-xs">{{ items[6].caption }}</p>
    </div>

    <!-- Item 8: Square -->
    <div v-if="items[7]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[7].image.src"
          :alt="items[7].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[7].caption" class="text-muted-foreground text-xs">{{ items[7].caption }}</p>
    </div>

    <!-- Item 9: Vertical rectangle -->
    <div v-if="items[8]?.image?.src">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[8].image.src"
          :alt="items[8].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p v-if="items[8].caption" class="text-muted-foreground text-xs">{{ items[8].caption }}</p>
    </div>

    <!-- Item 10: Wide landscape -->
    <div v-if="items[9]?.image?.src" class="col-span-2">
      <UiAspectRatio :ratio="16 / 10" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[9].image.src"
          :alt="items[9].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="800"
          height="500"
        />
      </UiAspectRatio>
      <p v-if="items[9].caption" class="text-muted-foreground text-xs">{{ items[9].caption }}</p>
    </div>

    <!-- Item 11: Square -->
    <div v-if="items[10]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[10].image.src"
          :alt="items[10].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[10].caption" class="text-muted-foreground text-xs">{{ items[10].caption }}</p>
    </div>

    <!-- Item 12: Tall portrait -->
    <div v-if="items[11]?.image?.src" class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[11].image.src"
          :alt="items[11].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p v-if="items[11].caption" class="text-muted-foreground text-xs">{{ items[11].caption }}</p>
    </div>

    <!-- Item 13: Square -->
    <div v-if="items[12]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[12].image.src"
          :alt="items[12].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </UiAspectRatio>
      <p v-if="items[12].caption" class="text-muted-foreground text-xs">{{ items[12].caption }}</p>
    </div>

    <!-- Item 14: Wide landscape -->
    <div v-if="items[13]?.image?.src" class="col-span-2">
      <UiAspectRatio :ratio="16 / 9" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[13].image.src"
          :alt="items[13].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[13].caption" class="text-muted-foreground text-xs">{{ items[13].caption }}</p>
    </div>

    <!-- Item 15: Square -->
    <div v-if="items[14]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[14].image.src"
          :alt="items[14].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="600"
        />
      </UiAspectRatio>
      <p v-if="items[14].caption" class="text-muted-foreground text-xs">{{ items[14].caption }}</p>
    </div>

    <!-- Item 16: Vertical rectangle -->
    <div v-if="items[15]?.image?.src">
      <UiAspectRatio :ratio="2 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[15].image.src"
          :alt="items[15].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[15].caption" class="text-muted-foreground text-xs">{{ items[15].caption }}</p>
    </div>

    <!-- Item 17: Horizontal rectangle -->
    <div v-if="items[16]?.image?.src" class="col-span-2">
      <UiAspectRatio :ratio="4 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[16].image.src"
          :alt="items[16].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="800"
          height="600"
        />
      </UiAspectRatio>
      <p v-if="items[16].caption" class="text-muted-foreground text-xs">{{ items[16].caption }}</p>
    </div>

    <!-- Item 18: Square -->
    <div v-if="items[17]?.image?.src">
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[17].image.src"
          :alt="items[17].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p v-if="items[17].caption" class="text-muted-foreground text-xs">{{ items[17].caption }}</p>
    </div>

    <!-- Item 19: Tall portrait -->
    <div v-if="items[18]?.image?.src" class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          :src="items[18].image.src"
          :alt="items[18].image.alt || 'Gallery image'"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p v-if="items[18].caption" class="text-muted-foreground text-xs">{{ items[18].caption }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  galleryData: {
    type: Object,
    default: () => ({ items: [] })
  }
});

const items = computed(() => props.galleryData?.items || []);
</script>
