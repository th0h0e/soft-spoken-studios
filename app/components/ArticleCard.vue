<template>
  <NuxtLink
    :to="article.path"
    :aria-label="article.title"
    class="group block"
  >
    <UiCard class="flex flex-col md:flex-row md:items-start p-6 hover:shadow-md transition-all duration-200 group-hover:border-primary/20">
      <!-- Image Section (if available) -->
      <div v-if="article.image" class="md:w-48 md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
        <NuxtImg
          :src="article.image"
          :alt="`${article.title} article image`"
          class="w-full h-48 md:h-32 object-cover rounded-md"
          width="200"
          height="128"
        />
      </div>

      <!-- Content Section -->
      <div class="flex-1 space-y-3">
        <!-- Title -->
        <h3 class="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {{ article.title }}
        </h3>

        <!-- Meta Information -->
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{{ formatDate(article.date) }}</span>
        </div>

        <!-- Description/Excerpt -->
        <p class="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {{ article.description || article.excerpt }}
        </p>

      </div>
    </UiCard>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

// Format date utility
const formatDate = (dateString) => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString // fallback to original string
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>