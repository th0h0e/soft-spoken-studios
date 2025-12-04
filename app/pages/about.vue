<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const sphereContainerSize = ref(400)

onMounted(() => {
  sphereContainerSize.value = window.innerWidth < 640 ? 320 : 400
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page" />
    <USeparator
      color="neutral"
      type="solid"
    />
    <UPageSection
      v-if="page.sphere"
      :ui="{ container: 'py-8 px-0' }"
    >
      <Sphere
        :images="page.sphere.images"
        :auto-rotate="page.sphere.autoRotate"
        :auto-rotate-speed="page.sphere.autoRotateSpeed"
        :container-size="sphereContainerSize"
      />
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
