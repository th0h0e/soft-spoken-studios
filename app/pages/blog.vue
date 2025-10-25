<template>
  <div>
    <Header
      headline="Creative Insights"
      title="Thoughts & Perspectives"
      description="Exploring creativity, strategy, and the intersection of thoughtful communication with meaningful storytelling."
    />

    <UiContainer class="-mt-8">
      <div class="grid gap-8 lg:grid-cols-8">
        <!-- Left Column - Blog List -->
        <div class="bg-muted space-y-8 p-12 lg:col-span-5">
          <BlogList :articles="blogPosts || []" :items-per-page="6" />
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-3">
          <!-- Empty for now - could add featured posts, categories, etc. -->
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
</script>
