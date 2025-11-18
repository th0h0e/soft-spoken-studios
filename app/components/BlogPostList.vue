<script setup lang="ts">
defineProps<{
  posts?: Array<{
    path: string
    title: string
    description?: string
    date: string
    image?: {
      src: string
      alt: string
    }
  }>
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-8">
    <NuxtLink
      v-for="(post, index) in posts"
      :key="index"
      :to="post.path"
      class="group flex gap-6 items-start"
    >
      <!-- Image -->
      <div
        v-if="post.image"
        class="w-1/3 shrink-0"
      >
        <NuxtImg
          :src="post.image.src"
          :alt="post.image.alt"
          class="w-full aspect-4/3 object-cover rounded-lg transition-opacity group-hover:opacity-90"
          width="400"
          height="300"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col">
        <p
          v-if="post.date"
          class="text-xs text-muted mb-2"
        >
          {{ formatDate(post.date) }}
        </p>
        <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {{ post.title }}
        </h3>
        <p
          v-if="post.description"
          class="text-muted text-sm"
        >
          {{ post.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
