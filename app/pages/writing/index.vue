<script setup lang="ts">
const { data: page } = await useAsyncData('writing-page', () => {
  return queryCollection('pages').path('/writing').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
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
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
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
