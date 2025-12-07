<script setup lang="ts">
interface Props {
  to: string
  title: string
  description: string
  gallery?: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-[620px] pl-2 pb-12 sm:p-3 sm:pb-16 mx-auto">
    <NuxtLink :to="to" class="block cursor-pointer">
      <UCard
        :ui="{
          root: 'cursor-pointer',
          header: '!p-0',
          body: 'bg-elevated/30 hover:bg-elevated/50 transition-colors'
        }"
      >
        <template #header>
          <Carousel
            v-if="gallery"
            :images="gallery"
            class="pointer-events-none"
          />
        </template>

        <div class="flex flex-col gap-1">
          <h2 class="text-md font-semibold">
            {{ title }}
          </h2>
          <p class="text-sm">
            {{ description }}
          </p>
        </div>
      </UCard>
    </NuxtLink>
  </div>
</template>
