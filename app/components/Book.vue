<script setup lang="ts">
const props = defineProps<{
  page: {
    book?: {
      author: string
      title: string
      subtitle: string
      postscript: string[]
      editor: string
    }
  }
}>()

const book = computed(() => props.page.book)
</script>

<template>
  <UPageSection v-if="book">
    <div class="py-8">
      <!-- Author Name -->
      <h1 class="mb-16 text-3xl font-normal">
        {{ book.author }}
      </h1>

      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="mb-4 text-6xl leading-tight font-bold">
          <template
            v-for="(word, index) in book.title.split(' ')"
            :key="index"
          >
            {{ word }}<br>
          </template>
        </h2>
        <p class="text-3xl font-normal italic">
          {{ book.subtitle }}
        </p>
      </div>
    </div>

    <!-- Divider line -->
    <div class="mb-12 w-full border-t-2 border" />

    <div class="pb-16">
      <!-- Postscript -->
      <div class="space-y-2 text-left">
        <p
          v-for="(line, index) in book.postscript"
          :key="index"
          class="text-lg text-muted font-normal"
          :class="{ 'tracking-wider': index === 1 }"
        >
          {{ line }}
        </p>
      </div>

      <!-- Editor -->
      <p class="mt-8 text-left text-lg font-normal">
        {{ book.editor }}
      </p>
    </div>
  </UPageSection>
</template>
