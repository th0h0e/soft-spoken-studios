<script setup lang="ts">
/**
 * Book Component - Props-Based Format
 *
 * Displays a formatted book cover with author, title, subtitle, postscript, and editor.
 *
 * Usage:
 * <Book :author="author" :title="title" :subtitle="subtitle" :postscript="[]" :editor="editor" />
 */

const props = defineProps<{
  author: string
  title: string
  subtitle: string
  postscript: string[]
  editor: string
}>()
</script>

<template>
  <UPageSection>
    <div class="py-8">
      <!-- Author Name -->
      <h1 class="mb-16 text-3xl font-normal">
        {{ props.author }}
      </h1>

      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="mb-4 text-6xl leading-tight font-bold">
          <template
            v-for="(word, index) in props.title.split(' ')"
            :key="index"
          >
            {{ word }}<br>
          </template>
        </h2>
        <p class="text-3xl font-normal italic">
          {{ props.subtitle }}
        </p>
      </div>
    </div>

    <!-- Divider line -->
    <div class="mb-12 w-full border-t-2 border" />

    <div class="pb-16">
      <!-- Postscript -->
      <div class="space-y-2 text-left">
        <p
          v-for="(line, index) in props.postscript"
          :key="index"
          class="text-lg text-muted font-normal"
          :class="{ 'tracking-wider': index === 1 }"
        >
          {{ line }}
        </p>
      </div>

      <!-- Editor -->
      <p class="mt-8 text-left text-lg font-normal">
        {{ props.editor }}
      </p>
    </div>
  </UPageSection>
</template>
