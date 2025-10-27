<template>
  <UiContainer class="md:!px-0">
    <Header
      headline="Creative Insights"
      title="Thoughts & Perspectives"
      description="Exploring creativity, strategy, and the intersection of thoughtful communication with meaningful storytelling."
    />

    <div class="-mt-8 pb-16">
      <div class="grid gap-4 lg:grid-cols-10">
        <!-- Left Column - Blog List (7/10) -->
        <div class="space-y-4 lg:col-span-7">
          <!-- Loading State -->
          <div v-if="pending" class="flex h-64 flex-col items-center justify-center">
            <Icon name="svg-spinners:ring-resize" class="h-8 w-8 text-muted" />
            <p class="mt-4 text-muted">Loading articles...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="flex h-64 flex-col items-center justify-center">
            <Icon name="lucide:alert-circle" class="h-8 w-8 text-destructive" />
            <p class="mt-4 text-destructive">Failed to load articles</p>
            <UiButton @click="refresh" variant="outline" class="mt-4">
              Try Again
            </UiButton>
          </div>

          <!-- Articles List -->
          <div v-else-if="blogPosts?.length" class="space-y-4">
            <NuxtLink
              v-for="post in blogPosts"
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

          <!-- Empty State -->
          <div v-else class="flex h-64 flex-col items-center justify-center">
            <Icon name="lucide:file-text" class="h-8 w-8 text-muted" />
            <p class="mt-4 text-muted">No articles found.</p>
          </div>
        </div>

        <!-- Right Column (3/10) -->
        <div class="lg:col-span-3">
          <!-- Empty for now - could add featured posts, categories, etc. -->
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script setup>
// Fetch blog posts using Nuxt Content
const { data: blogPosts, error, pending, refresh } = await useAsyncData(
  'blog-posts',
  () => queryCollection("articles").all(),
  {
    transform: (articles) => articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    default: () => []
  }
);
</script>
