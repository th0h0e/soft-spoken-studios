<script setup lang="ts">
defineOgImageComponent('NuxtSeo', {
  title: 'Hello OG Image',
  description: 'Look at me in dark mode',
  theme: '#ff0000',
  colorMode: 'dark'
})

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

    <LandingFAQ :page />
    <LandingLetter :page />
    <LandingTestimonials :page />
    <ProjectIndex title="Recent Projects" />
  </UPage>
</template>
