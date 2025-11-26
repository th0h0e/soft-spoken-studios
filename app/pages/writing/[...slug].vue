<script lang="ts" setup>
import appMeta from '../../app.meta'

const route = useRoute()
const authorEl = ref<HTMLElement | null>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const { data } = await useAsyncData(route.path, () => queryCollection('writing').path(route.path).first())
if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

// Override SEO with blog post-specific data
useSeoMeta({
  title: `${data.value.title} - ${appMeta.name}`,
  description: data.value.description
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('writing', route.path, {
    fields: ['description']
  })
})

onMounted(() => {
  const contentEl = document.getElementById('content')
  authorEl.value = contentEl?.querySelector('#author-about')
})
</script>

<template>
  <div>
    <!-- Article header: Title, description, metadata -->
    <UPageHeader
      :title="data?.title"
      :description="data?.description"
    >
      <template #headline>
        <ULink
          to="/writing"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
      </template>
    </UPageHeader>

    <USeparator
      color="neutral"
      type="solid"
    />

    <!-- Mobile ToC collapsible -->
    <MobileToc />

    <!-- Main article content -->
    <UPageBody>
      <div class="flex items-center flex-wrap gap-4 justify-between mt-4">
        <div class="flex flex-col gap-4">
          <UUser
            v-bind="data?.author"
            class="cursor-default"
            @click="() => authorEl?.scrollIntoView()"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          <UBadge
            v-if="data?.date"
            size="sm"
            variant="subtle"
            color="neutral"
            :label="formatDate(data.date)"
            icon="lucide:calendar"
          />
          <UBadge
            v-if="data?.minRead"
            size="sm"
            variant="subtle"
            color="neutral"
            :label="`${data.minRead} Min Read`"
            icon="lucide:clock"
          />
        </div>
      </div>
      <!-- Markdown content renderer -->
      <ContentRenderer
        v-if="data"
        id="content"
        :value="data"
        class="markdown-content flex-1"
      />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </div>
</template>
