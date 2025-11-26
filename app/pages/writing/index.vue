<script setup lang="ts">
const { data: page } = await useAsyncData('writing-page', () => {
  return queryCollection('collectionPages').path('/writing').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const { data: posts } = await useAsyncData('writings', () =>
  queryCollection('writing').order('date', 'DESC').all()
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'posts not found',
    fatal: true
  })
}
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />
    <div class="py-8">
      <USeparator
        color="neutral"
        type="solid"
      />
    </div>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <BlogPostList :posts="posts" />
    </UPageSection>
  </UPage>
</template>
