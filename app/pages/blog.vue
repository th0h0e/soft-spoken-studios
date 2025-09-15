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
        <div class="lg:col-span-5 space-y-8 bg-muted p-12">
          <!-- Search and Filter -->
          <WritingSearch
            :articles="blogPosts || []"
            @filtered="handleFilteredArticles"
          />

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
            <div v-else-if="filteredArticles.length === 0" class="flex flex-col items-center justify-center h-full">
              <Icon name="lucide:search-x" class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 class="text-lg font-semibold mb-2">No articles found</h3>
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
// Get current locale for i18n content
const { locale } = useI18n()

// Fetch blog posts using Nuxt Content - locale-specific approach
const { data: blogPosts } = await useAsyncData(`blog-posts-${locale.value}`, async () => {
  const collectionName = `articles_${locale.value}`
  try {
    const articles = await queryCollection(collectionName).all()
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    // Fallback to legacy collection if locale-specific doesn't exist
    console.warn(`Collection ${collectionName} not found, falling back to 'articles'`)
    const articles = await queryCollection('articles').all()
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 6

// State for filtered articles
const filteredArticles = ref(blogPosts.value || [])

// Computed property for paginated articles
const paginatedArticles = computed(() => {
  if (!filteredArticles.value || filteredArticles.value.length === 0) {
    return []
  }

  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredArticles.value.slice(start, end)
})

// Handle filtered articles from search component
const handleFilteredArticles = (filtered) => {
  filteredArticles.value = filtered
  // Reset to first page when search results change
  currentPage.value = 1
}

// Watch for page changes to scroll to top
watch(currentPage, () => {
  // Scroll to top of articles section for better UX
  nextTick(() => {
    const articlesSection = document.querySelector('.h-\\[600px\\]')
    if (articlesSection) {
      articlesSection.scrollTop = 0
    }
  })
})
</script>