<template>
  <div>
    <Header
      headline="Creative Insights"
      title="Thoughts & Perspectives"
      description="Exploring creativity, strategy, and the intersection of thoughtful communication with meaningful storytelling."
    />

    <UiContainer class="-mt-8">
      <div class="grid gap-8 lg:grid-cols-8">
        <!-- Left Column -->
        <div class="bg-muted space-y-8 p-12 lg:col-span-5">
          <!-- Search and Filter -->
          <WritingSearch :articles="blogPosts || []" @filtered="handleFilteredArticles" />

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

        <!-- Right Column -->
        <div class="lg:col-span-3">
          <!-- Empty for now -->
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
  // Fetch blog posts using Nuxt Content
  const { data: blogPosts } = await useAsyncData('blog-posts', async () => {
    try {
      const articles = await queryCollection("articles").all();
      return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      return [];
    }
  });

  // Pagination state
  const currentPage = ref(1);
  const itemsPerPage = 6;

  // State for filtered articles
  const filteredArticles = ref(blogPosts.value || []);

  // Computed property for paginated articles
  const paginatedArticles = computed(() => {
    if (!filteredArticles.value || filteredArticles.value.length === 0) {
      return [];
    }

    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
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
</script>
