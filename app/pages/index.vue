<script setup>
// Set page head
useHead({
  title: 'Home'
})

const { locale } = useI18n()

// Get content for current locale
const homeKey = `home-${locale.value}`
const { data: page } = await useAsyncData(homeKey, async () => {
  const collectionName = `content_${locale.value}` as keyof Collections;
  const path = `/${locale.value}`;
  return await queryCollection(collectionName).path(path).first();
})

// Get articles for side cards
const articlesKey = `articles-${locale.value}`
const { data: articles } = await useAsyncData(articlesKey, async () => {
  const collectionName = `articles_${locale.value}` as keyof Collections;
  return await queryCollection(collectionName).all();
})

// Get first few articles for display
const featuredArticles = computed(() => articles.value?.slice(0, 3) || [])
</script>

<template>
  <div>
    <UiContainer v-if="page">
      <!-- Hero Section -->
      <div class="text-center py-16">
        <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>
        <p class="text-xl text-muted mb-8">{{ page.description }}</p>
      </div>

      <!-- Content Section -->
      <div class="grid lg:grid-cols-8 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-6">
          <ContentRenderer v-if="page.body" :value="page" class="text-base leading-relaxed space-y-6" />
        </div>

        <!-- Sidebar with Article Cards -->
        <div class="lg:col-span-2">
          <div class="space-y-6">
            <SideCard
              v-for="article in featuredArticles"
              :key="article._path"
              :title="article.title"
              :preview="article.preview"
              :to="article._path"
            />
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Fallback if no content -->
    <UiContainer v-else class="text-center py-16">
      <h1 class="text-4xl font-bold mb-4">Soft Spoken Studios</h1>
      <p class="text-xl text-muted">We can write your talk, and capture your walk</p>
    </UiContainer>
  </div>
</template>