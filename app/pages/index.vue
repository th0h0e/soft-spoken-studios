<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.book?.title,
  ogTitle: page.value?.book?.title,
  description: page.value?.book?.subtitle,
  ogDescription: page.value?.book?.subtitle
})

defineOgImageComponent('SoftSpokenStudio', {
  title: page.value?.book?.title,
  description: page.value?.book?.subtitle,
  colorMode: 'dark'
})
</script>

<template>
  <UPage v-if="page">
    <Book :page />

    <TwoImages
      :images="[
        {
          src: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
          alt: 'Direct component usage',
          link: '/projects'
        },
        {
          src: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
          alt: 'No YAML needed',
          link: '/about'
        }
      ]"
    />

    <LandingLetter :page />
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
    <LandingFAQ :page />
    <ProjectIndex title="Recent Projects" />
  </UPage>
</template>
