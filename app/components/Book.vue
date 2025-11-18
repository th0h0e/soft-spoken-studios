<template>
  <UPageSection>
    <div class="py-16">
      <!-- Author Name -->
      <h1 class="mb-16 text-4xl font-normal">
        {{ page.author }}
      </h1>

      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="mb-4 text-6xl leading-tight font-bold">
          <template
            v-for="(line, lineIndex) in page.title"
            :key="lineIndex"
          >
            <template
              v-for="(word, wordIndex) in line.split(' ')"
              :key="`${lineIndex}-${wordIndex}`"
            >
              {{ word }}<br>
            </template>
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
          class="text-lg font-normal"
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

<script setup lang="ts">
import type { BookCollectionItem } from '@nuxt/content'

/**
 * Book Cover Component for Nuxt Studio
 *
 * A book cover-style layout component that displays:
 * - Author name
 * - Multi-line title
 * - Subtitle
 * - Postscript lines
 * - Editor/location info
 *
 * Data is sourced from content/book.yml and edited via Nuxt Studio
 *
 * Schema: schemas/book.schema.ts
 * Collection: book (defined in content.config.ts)
 *
 * Usage:
 * Query the book collection and pass the result to this component as the page prop.
 */

defineProps<{
  page: BookCollectionItem
}>()
</script>
