<template>
  <NuxtLink :to="article.path" :aria-label="article.title" class="group block">
    <UiCard
      class="group-hover:border-primary/20 flex flex-col p-6 transition-all duration-200 hover:shadow-md md:flex-row md:items-start"
    >
      <!-- Image Section (if available) -->
      <div
        v-if="article.heroImage || article.image"
        class="mb-4 md:mr-6 md:mb-0 md:w-48 md:flex-shrink-0"
      >
        <NuxtImg
          :src="article.heroImage || article.image"
          :alt="article.heroImageDescription || `${article.title} article image`"
          class="h-48 w-full rounded-md object-cover md:h-32"
          width="200"
          height="128"
        />
      </div>

      <!-- Content Section -->
      <div class="flex-1 space-y-3">
        <!-- Title -->
        <h3
          class="group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors"
        >
          {{ article.title }}
        </h3>

        <!-- Meta Information -->
        <div class="text-muted-foreground flex items-center gap-3 text-sm">
          <span>{{ formatDate(article.date) }}</span>
        </div>

        <!-- Preview Text -->
        <p class="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {{ article.preview || article.description || article.excerpt }}
        </p>
      </div>
    </UiCard>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    article: {
      type: Object,
      required: true,
    },
  });

  // Format date utility
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString; // fallback to original string
    }
  };
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
