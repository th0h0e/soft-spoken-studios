<script setup lang="ts">
import appMeta from '../app.meta'

useSeoMeta({
  title: appMeta.name,
  description: appMeta.description
})

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

const { data: letter } = await useAsyncData('letter', () => {
  return queryCollection('letter').first()
})

const { data: twoimages } = await useAsyncData('twoimages', () => {
  return queryCollection('twoimages').first()
})

const { data: book } = await useAsyncData('book', () => {
  return queryCollection('book').first()
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
    <Book
      v-if="book"
      :page="book"
    />
    <LandingLetter
      v-if="letter"
      :page="letter"
    />
    <TwoImages
      v-if="twoimages?.twoimages?.images"
      :images="twoimages.twoimages.images"
    />

    <TwoImages
      :images="[
        {
          src: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
          alt: 'Example image 1',
          title: 'Direct component usage',
          link: '/projects'
        },
        {
          src: '/hero/3334f4a0741954580a818e303927dfcd.jpg',
          alt: 'Example image 2',
          title: 'No YAML needed',
          link: '/about'
        }
      ]"
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

    <LandingFAQ :page="page" />
    <ProjectIndex title="Recent Projects" />
  </UPage>
</template>
