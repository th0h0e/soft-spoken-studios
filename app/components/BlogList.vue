<template>
  <div class="space-y-8">
    <!-- Search and Filter -->
    <WritingSearch :articles="articles || []" @filtered="handleFilteredArticles" />

    <!-- Articles Section with Fixed Height -->
    <div class="h-[600px] overflow-y-auto">
      <!-- Blog Posts Grid -->
      <div v-if="paginatedArticles.length" class="space-y-4">
        <NuxtLink
          v-for="post in paginatedArticles"
          :key="post._id"
          :to="post.path"
          class="block"
        >
          <SideCard>
            <template #title>{{ post.title }}</template>
            <template #content>{{ post.description || post.excerpt }}</template>
          </SideCard>
        </NuxtLink>
      </div>

      <!-- No Results -->
      <div
        v-else-if="filteredArticles.length === 0"
        class="flex h-full flex-col items-center justify-center"
      >
        <Icon name="lucide:search-x" class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 class="mb-2 text-lg font-semibold">No articles found</h3>
        <p class="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div>
      <UiPagination
        v-if="filteredArticles.length > 0"
        :total="filteredArticles.length"
        :items-per-page="itemsPerPage"
        :sibling-count="1"
        :show-edges="true"
        v-model:page="currentPage"
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    articles: {
      type: Array,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 6,
    },
  });

  // Pagination state
  const currentPage = ref(1);

  // State for filtered articles
  const filteredArticles = ref(props.articles || []);

  // Computed property for paginated articles
  const paginatedArticles = computed(() => {
    if (!filteredArticles.value || filteredArticles.value.length === 0) {
      return [];
    }

    const start = (currentPage.value - 1) * props.itemsPerPage;
    const end = start + props.itemsPerPage;
    return filteredArticles.value.slice(start, end);
  });

  // Handle filtered articles from search component
  const handleFilteredArticles = (filtered) => {
    filteredArticles.value = filtered;
    // Reset to first page when search results change
    currentPage.value = 1;
  };

  // Watch for page changes to scroll to top
  watch(currentPage, () => {
    // Scroll to top of articles section for better UX
    nextTick(() => {
      const articlesSection = document.querySelector(".h-\\[600px\\]");
      if (articlesSection) {
        articlesSection.scrollTop = 0;
      }
    });
  });

  // Watch for articles prop changes
  watch(
    () => props.articles,
    (newArticles) => {
      filteredArticles.value = newArticles || [];
    }
  );
</script>
