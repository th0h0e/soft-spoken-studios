<script lang="ts" setup>
definePageMeta({
  layout: 'no-columns'
})

const { data: gallery } = await useAsyncData('gallery', () => {
  return queryCollection('gallery').first()
})

if (!gallery.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Gallery not found',
    fatal: true
  })
}
</script>

<template>
  <div>
    <UPage v-if="gallery">
      <UPageHero
        :title="gallery.title"
        :description="gallery.description"
        :ui="{
          title: '!mx-0 text-left',
          description: '!mx-0 text-left'
        }"
      />
      <div class="py-8">
        <USeparator
          color="neutral"
          type="solid"
        />
      </div>
      <UPageSection>
        <RandomGrid :items="gallery.items" />
      </UPageSection>
    </UPage>
  </div>
</template>
