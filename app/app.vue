<script setup lang="ts">
import appMeta from './app.meta'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

// Global SEO meta - applied to all pages by default
useSeoMeta({
  title: appMeta.name,
  description: appMeta.description,
  ogTitle: appMeta.name,
  ogDescription: appMeta.description,
  ogImage: appMeta.author.image,
  ogUrl: appMeta.url,
  twitterCard: 'summary_large_image',
  twitterTitle: appMeta.name,
  twitterDescription: appMeta.description,
  twitterImage: appMeta.author.image
})

useHead({
  meta: [
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: appMeta.icon }
  ]
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('writing')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('writing')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <UApp :scroll-body="false">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
