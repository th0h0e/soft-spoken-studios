<script setup lang="ts">
const route = useRoute()
const { isWritingArticle } = usePageType()

// Fetch article previews for default sidebar
const { data: articles } = await useAsyncData('sidebar-articles', () =>
  queryCollection('writing').order('date', 'DESC').limit(3).all()
)

// Fetch current article's ToC when on article page
const { data: currentArticle } = await useAsyncData(
  () => `article-toc-${route.path}`,
  () => queryCollection('writing').path(route.path).first(),
  { watch: [() => route.path] }
)
</script>

<template>
  <!-- Article ToC sidebar (shown on writing article pages) -->
  <div
    v-if="isWritingArticle && currentArticle"
    class="flex flex-col gap-4 pt-0 pb-8 px-4"
  >
    <UContentToc
      v-if="currentArticle.body?.toc?.links"
      :links="currentArticle.body.toc.links"
      highlight
    />
  </div>

  <!-- Article previews sidebar (shown on other pages) -->
  <div
    v-else
    class="flex flex-col gap-0"
  >
    <NuxtLink
      v-for="article in articles"
      :key="article.path"
      :to="article.path"
      class="block"
    >
      <UCard
        variant="outline"
      >
        <h3 class="text-sm font-medium mb-1">
          {{ article.title }}
        </h3>
        <p class="text-sm text-muted line-clamp-2">
          {{ article.description }}
        </p>
      </UCard>
    </NuxtLink>
  </div>
</template>
