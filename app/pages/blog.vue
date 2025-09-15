<script setup>
// Set page head
useHead({
  title: 'Blog'
})

const { locale } = useI18n()

// Get all articles for current locale
const { data: articles } = await useAsyncData(`articles-${locale.value}`, async () => {
  const collection = `articles_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
})

// Sort articles by date (newest first)
const sortedArticles = computed(() => {
  if (!articles.value) return []
  return articles.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div>
    <UiContainer>
      <!-- Header -->
      <div class="text-center py-16">
        <h1 class="text-4xl font-bold mb-4">Blog</h1>
        <p class="text-xl text-muted">Thoughts on communication and storytelling</p>
      </div>

      <!-- Articles Grid -->
      <div v-if="sortedArticles.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <UiCard v-for="article in sortedArticles" :key="article._path" class="group">
          <NuxtLink :to="article._path" class="block">
            <div class="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                v-if="article.heroImage"
                :src="article.heroImage"
                :alt="article.heroImageDescription || article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <UiCardContent class="p-6">
              <h2 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {{ article.title }}
              </h2>
              <p class="text-muted mb-4 leading-relaxed">
                {{ article.preview }}
              </p>
              <div class="flex items-center justify-between text-sm text-muted">
                <time :datetime="article.date">
                  {{ new Date(article.date).toLocaleDateString() }}
                </time>
                <span v-if="article.readingTime" class="text-xs">
                  {{ article.readingTime }}
                </span>
              </div>
            </UiCardContent>
          </NuxtLink>
        </UiCard>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-semibold mb-4">No articles yet</h2>
        <p class="text-muted">We're working on some great content. Check back soon!</p>
      </div>
    </UiContainer>
  </div>
</template>