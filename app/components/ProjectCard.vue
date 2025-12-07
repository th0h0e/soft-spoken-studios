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
  <NuxtLink :to="to">
    <UCard
      :ui="{
        header: '!p-0',
        body: 'bg-elevated/30 hover:bg-elevated/50 transition-colors'
      }"
    >
      <template #header>
        <Carousel
          v-if="gallery"
          :images="gallery"
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
</template>
