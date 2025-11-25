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
      <UPageHeader
        :title="gallery.title"
        :description="gallery.description"
      />
      <div class="py-8">
        <USeparator
          color="neutral"
          type="solid"
        />
      </div>
      <div class="px-4 sm:px-6 lg:px-8 py-12">
        <RandomGrid :items="gallery.items" />
      </div>
    </UPage>
  </div>
</template>
