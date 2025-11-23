<script setup lang="ts">
import appMeta from '../app.meta'

useSeoMeta({
  title: appMeta.name,
  description: appMeta.description
})

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
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page" />
    <UPageSection>
      <div class="flex justify-center">
        <Sphere
          :images="[
            { id: '1', src: '/hero/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Image 1' },
            { id: '2', src: '/tumblr_19df72ce625b3ce6a5a908cca33bcd27_5060056c_1280.jpg', alt: 'Image 2' },
            { id: '3', src: '/tumblr_b3ea4838bff77d1926c3c8c4a412c361_90fd311f_1280.jpg', alt: 'Image 3' },
            { id: '4', src: '/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg', alt: 'Image 4' },
            { id: '5', src: '/tumblr_5d36f28f4d2d7f414da50f8e53179f05_ad7b99ee_1280.jpg', alt: 'Image 5' },
            { id: '6', src: '/tumblr_cb80e258f38e0f5941de505643f12790_4fd4fa54_1280.jpg', alt: 'Image 6' },
            { id: '7', src: '/tumblr_o9e0sqIpWi1rpgpe2o1_1280.jpg', alt: 'Image 7' },
            { id: '8', src: '/aca7dce603845cdd7cfa134bfba03060.jpg', alt: 'Image 8' },
            { id: '9', src: '/hero/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Image 9' },
            { id: '10', src: '/tumblr_19df72ce625b3ce6a5a908cca33bcd27_5060056c_1280.jpg', alt: 'Image 10' },
            { id: '11', src: '/tumblr_b3ea4838bff77d1926c3c8c4a412c361_90fd311f_1280.jpg', alt: 'Image 11' },
            { id: '12', src: '/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg', alt: 'Image 12' },
            { id: '13', src: '/tumblr_5d36f28f4d2d7f414da50f8e53179f05_ad7b99ee_1280.jpg', alt: 'Image 13' },
            { id: '14', src: '/tumblr_cb80e258f38e0f5941de505643f12790_4fd4fa54_1280.jpg', alt: 'Image 14' },
            { id: '15', src: '/tumblr_o9e0sqIpWi1rpgpe2o1_1280.jpg', alt: 'Image 15' },
            { id: '16', src: '/aca7dce603845cdd7cfa134bfba03060.jpg', alt: 'Image 16' },
            { id: '17', src: '/hero/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Image 17' },
            { id: '18', src: '/tumblr_19df72ce625b3ce6a5a908cca33bcd27_5060056c_1280.jpg', alt: 'Image 18' },
            { id: '19', src: '/tumblr_b3ea4838bff77d1926c3c8c4a412c361_90fd311f_1280.jpg', alt: 'Image 19' },
            { id: '20', src: '/tumblr_4f7ee9971f08af76724d2bb7123ea3cb_a5744973_1280.jpg', alt: 'Image 20' },
            { id: '21', src: '/tumblr_5d36f28f4d2d7f414da50f8e53179f05_ad7b99ee_1280.jpg', alt: 'Image 21' },
            { id: '22', src: '/tumblr_cb80e258f38e0f5941de505643f12790_4fd4fa54_1280.jpg', alt: 'Image 22' },
            { id: '23', src: '/tumblr_o9e0sqIpWi1rpgpe2o1_1280.jpg', alt: 'Image 23' },
            { id: '24', src: '/aca7dce603845cdd7cfa134bfba03060.jpg', alt: 'Image 24' }
          ]"
          :container-size="400"
          :auto-rotate="true"
          :auto-rotate-speed="0.1"
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
  </UPage>
</template>
