<script setup lang="ts">
import type { BookCollectionItem } from '@nuxt/content'

defineProps<{
  page: BookCollectionItem
}>()
</script>

<template>
  <UPageSection>
    <div class="py-8">
      <!-- Author Name -->
      <h1 class="mb-16 text-3xl font-normal">
        {{ page.author }}
      </h1>

      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="mb-4 text-6xl leading-tight font-bold">
          <template
            v-for="(word, index) in page.title.split(' ')"
            :key="index"
          >
            {{ word }}<br>
          </template>
        </h2>
        <p class="text-3xl font-normal italic">
          {{ page.subtitle }}
        </p>
      </div>
    </div>

    <!-- Divider line -->
    <div class="mb-12 w-full border-t-2 border" />

    <div class="pb-16">
      <!-- Postscript -->
      <div class="space-y-2 text-left">
        <p
          v-for="(line, index) in page.postscript"
          :key="index"
          class="text-lg text-muted font-normal"
          :class="{ 'tracking-wider': index === 1 }"
        >
          {{ line }}
        </p>
      </div>

      <!-- Editor -->
      <p class="mt-8 text-left text-lg font-normal">
        {{ page.editor }}
      </p>
    </div>
  </UPageSection>
</template>
