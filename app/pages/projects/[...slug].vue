<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import appMeta from '../../app.meta'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('projects').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

// Override SEO with project-specific data
useSeoMeta({
  title: `${page.value.title} - ${appMeta.name}`,
  description: page.value.description || appMeta.description
})
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description']
  })
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const projectsNavigation = computed(() => navigation.value.find(item => item.path === '/projects')?.children || [])
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/projects"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Projects
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.client">
              {{ page.client }}
            </span>
            <span v-if="page.client && page.year">
              •
            </span>
            <span v-if="page.year">
              {{ page.year }}
            </span>
            <span v-if="page.role && (page.client || page.year)">
              •
            </span>
            <span v-if="page.role">
              {{ page.role }}
            </span>
          </div>
          <NuxtImg
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full aspect-16/10 object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div
            v-if="page.tags"
            class="flex items-center justify-center gap-2 mt-2 flex-wrap"
          >
            <UBadge
              v-for="tag in page.tags"
              :key="tag"
              color="neutral"
              variant="subtle"
              size="sm"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
        <UPageBody>
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <ProjectGallery
            v-if="page.gallery && page.gallery.length > 0"
            :images="page.gallery"
            class="my-8"
          />

          <UContentSurround :surround />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
