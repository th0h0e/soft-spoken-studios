<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
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
</script>

<template>
  <UPage v-if="page">
    <!-- Hero, Sphere, Content, and Experience from Markdown -->
    <ContentRenderer :value="page" />

    <!-- Services Section -->
    <div class="py-8">
      <USeparator
        color="neutral"
        type="solid"
      />
      <UPageSection>
        <ServiceCard
          :cards="[
            {
              image: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
              imageAlt: 'Video production',
              badge: 'Service',
              title: 'Video Production',
              icon: 'feather:play',
              iconLabel: 'Creative Storytelling',
              description: 'Stories that move. We create videos that capture authentic moments and communicate your message.'
            },
            {
              image: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
              imageAlt: 'Copywriting',
              badge: 'Writing',
              title: 'Copywriting',
              icon: 'feather:pen-tool',
              iconLabel: 'Purposeful Communication',
              description: 'Words with purpose. Clear, compelling copy that connects with your audience.'
            }
          ]"
        />
      </UPageSection>
    </div>
  </UPage>
</template>
