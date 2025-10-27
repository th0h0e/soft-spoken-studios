<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-12">
      <Icon name="svg-spinners:ring-resize" class="h-6 w-6 text-muted" />
      <p class="mt-2 text-sm text-muted">Loading articles...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
      <Icon name="lucide:alert-circle" class="h-6 w-6 text-destructive" />
      <p class="mt-2 text-sm text-destructive">Failed to load articles</p>
    </div>

    <!-- Recent Articles -->
    <template v-else>
      <NuxtLink
        v-for="article in recentArticles"
        :key="article._id"
        :to="article.path"
        class="block"
      >
        <SideCard class="cursor-pointer transition-opacity hover:opacity-80">
          <template #title>{{ article.title }}</template>
          <template #content>{{ article.description || article.excerpt }}</template>
        </SideCard>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
// Fetch the latest 3 articles for the side cards
const { data: recentArticles, error, pending } = await useAsyncData(
  'recent-articles',
  () => queryCollection("articles").all(),
  {
    transform: (articles) => articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3),
    default: () => []
  }
);
</script>
