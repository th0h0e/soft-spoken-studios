<template>
  <div>
    <Header 
      headline="Creative Insights"
      title="Thoughts & Perspectives"
      description="Exploring creativity, strategy, and the intersection of thoughtful communication with meaningful storytelling."
    />
    
    <UiContainer class="-mt-8">
      <div class="grid lg:grid-cols-8 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-5">
          <!-- Search and Filter -->
          <WritingSearch
            :articles="blogPosts || []"
            @filtered="handleFilteredArticles"
            class="mb-8"
          />

          <!-- Blog Posts Grid -->
          <div v-if="filteredArticles.length" class="grid grid-cols-1 gap-6">
            <ArticleCard
              v-for="post in filteredArticles"
              :key="post._id"
              :article="post"
            />
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <Icon name="lucide:search-x" class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 class="text-lg font-semibold mb-2">No articles found</h3>
            <p class="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>


          <!-- Pagination -->
          <div class="mt-12">
            <UiPagination
              :total="24"
              :items-per-page="6"
              :default-page="1"
              :sibling-count="1"
              show-edges
              @update:page="handlePageChange"
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
// Fetch blog posts using Nuxt Content - direct approach like Canvas
const { data: blogPosts } = await useAsyncData('blog-posts', async () => {
  const articles = await queryCollection('articles').all()
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// State for filtered articles
const filteredArticles = ref(blogPosts.value || [])

// Handle filtered articles from search component
const handleFilteredArticles = (filtered) => {
  filteredArticles.value = filtered
}

const handlePageChange = (page) => {
  console.log('Page changed to:', page);
  // Handle page change logic here
  // In a real application, you would fetch new blog posts for the selected page
};
</script>