<script setup lang="ts">
definePageMeta({
  layout: 'content'
})

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
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in posts"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="post.path"
            v-bind="post"
            class="group"
          />
        </Motion>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
