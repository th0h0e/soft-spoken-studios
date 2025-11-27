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

defineOgImageComponent('SoftSpokenStudio', {
  title: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page" />
    <UPageSection v-if="page.sphere">
      <div class="flex justify-center">
        <Sphere
          :images="page.sphere.images"
          :auto-rotate="page.sphere.autoRotate"
          :auto-rotate-speed="page.sphere.autoRotateSpeed"
        />
      </div>
    </UPageSection>
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
      <MDC
        :value="page.content"
        unwrap="p"
      />
    </UPageSection>
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page="page" />
      <LandingWorkExperience :page="page" />
    </UPageSection>
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
  </UPage>
</template>
