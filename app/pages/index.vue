<script setup lang="ts">
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
    <LandingHero :page />
    <Book
      v-if="book"
      :page="book"
    />
    <LandingLetter
      v-if="letter"
      :page="letter"
    />
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <TwoImages
      v-if="twoimages"
      :page="twoimages"
    />
    <LandingTestimonials :page />
    <LandingFAQ :page />
    <ProjectIndex title="Recent Projects" />
  </UPage>
</template>
