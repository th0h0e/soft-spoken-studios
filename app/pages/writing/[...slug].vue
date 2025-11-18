<script lang="ts" setup>
definePageMeta({
  layout: 'no-columns'
})

const route = useRoute()
const authorEl = ref<HTMLElement | null>()
const clipboard = useClipboard()
const toast = useToast()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const { data } = await useAsyncData(route.path, () => queryCollection('writing').path(route.path).first())
if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('writing', route.path, {
    fields: ['description']
  })
})

if (data.value.image) {
  defineOgImage({ url: data.value.image.src })
} else {
  defineOgImageComponent('Blog', {
    headline: data.value?.title
  })
}

async function copyLink() {
  await clipboard.copy(window.location.href)
  toast.add({ title: 'Copied to clipboard', icon: 'lucide:check-circle', color: 'success' })
}
async function share() {
  await navigator.share({ url: route.fullPath })
}

onMounted(() => {
  const contentEl = document.getElementById('content')
  authorEl.value = contentEl?.querySelector('#author-about')
})
</script>

<template>
  <UPage :ui="{ center: 'lg:col-span-7!' }">
    <template #right>
      <UPageAside :ui="{ root: 'lg:col-span-3!' }">
        <UPageAnchors
          :links="[
            { label: 'YouTube tutorial', icon: 'lucide:youtube', to: 'https://www.youtube.com/@matteo-beltrame', target: '_blank' },
            { label: 'All posts', icon: 'lucide:newspaper', to: '/writing/' }
          ]"
        />
        <USeparator type="dotted" />
        <UContentToc
          v-if="data"
          :links="data.body.toc?.links"
          highlight
        />
        <UFieldGroup class="w-full">
          <UButton
            label="Share this article"
            icon="lucide:share-2"
            variant="subtle"
            color="neutral"
            class="grow"
            @click="share"
          />
          <UDropdownMenu :items="[{ label: 'Copy URL', icon: 'lucide:link', onSelect: copyLink }]">
            <UButton
              icon="lucide:chevron-down"
              variant="subtle"
              color="neutral"
            />
          </UDropdownMenu>
        </UFieldGroup>
      </UPageAside>
    </template>
    <UPageHeader
      :title="data?.title"
      :description="data?.description"
      :ui="{
        title: '!mx-0 max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: '!mx-0 text-left'
      }"
      class="py-18 sm:py-24 lg:py-32 border-none"
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
      <div class="py-8">
        <USeparator
          color="neutral"
          type="solid"
        />
      </div>
    </UPageHeader>

    <UContentToc
      v-if="data"
      :links="data.body.toc?.links"
      highlight
      class="lg:hidden"
    />
    <UPageBody>
      <ContentRenderer
        v-if="data"
        id="content"
        :value="data"
        class="markdown-content flex-1"
      />

      <div class="flex items-center justify-end gap-2 text-sm text-muted">
        <UButton
          size="sm"
          variant="link"
          color="neutral"
          label="Copy link"
          @click="copyLink"
        />
      </div>

      <USeparator />
      <p class="font-semibold mb-4">
        Related posts
      </p>
      <Card />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
