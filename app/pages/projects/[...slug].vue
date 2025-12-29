<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`projects-${route.path}`, () =>
  queryCollection('projects').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: surround } = await useAsyncData(`projects-${route.path}-surround`, () =>
  queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description']
  })
)

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<template>
  <div>
    <div class="bg-elevated/50!">
      <UPageHeader
        :ui="{
          container: 'flex flex-col gap-2 pb-0',
          wrapper: 'flex flex-col',
          headline: 'mb-8'
        }"
      >
        <template #headline>
          <ULink
            to="/projects"
            class="text-sm font-normal flex items-center gap-1"
          >
            <UIcon name="i-feather-chevron-left" />
            Projects
          </ULink>
        </template>

        <template #default>
          <!-- Metadata row -->
          <div class="flex text-sm text-muted items-center justify-center gap-2">
            <span v-if="page?.client">
              {{ page.client }}
            </span>
            <span v-if="page?.client && page?.role">
              •
            </span>
            <span v-if="page?.role">
              {{ page.role }}
            </span>
          </div>

          <!-- Hero image -->
          <NuxtImg
            v-if="page?.image"
            :src="page.image"
            :alt="page?.title"
            class="rounded-lg w-full aspect-16/10 object-cover object-center"
          />

          <!-- Title -->
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page?.title }}
          </h1>

          <!-- Description -->
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page?.description }}
          </p>
        </template>
      </UPageHeader>
    </div>

    <USeparator
      color="neutral"
      type="solid"
    />

    <UPageBody>
      <!-- Markdown content (use ::project-gallery in markdown to render gallery) -->
      <ContentRenderer
        v-if="page?.body"
        :value="page"
        class="markdown-content"
      />

      <UContentSurround :surround />
    </UPageBody>
  </div>
</template>
