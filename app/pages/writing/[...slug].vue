<template>
  <UPage :ui="{ center: 'lg:col-span-7!' }">
    <template #right>
      <UPageAside :ui="{ root: 'lg:col-span-3!' }">
        <UPageAnchors
          :links="[
            { label: 'YouTube tutorial', icon: 'mdi:youtube', to: 'https://www.youtube.com/@matteo-beltrame', target: '_blank' },
            { label: 'All articles', icon: 'material-symbols:article-rounded', to: '/articles/' }
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
            icon="material-symbols:share"
            variant="subtle"
            color="neutral"
            class="grow"
            @click="share"
          />
          <UDropdownMenu :items="[{ label: 'Copy URL', icon: 'mdi:link-variant', onSelect: copyLink }]">
            <UButton
              icon="i-lucide-chevron-down"
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
      headline="Blog"
    >
      <div class="flex items-end flex-wrap gap-4 justify-between mt-4">
        <div class="flex flex-col gap-4">
          <UUser
            v-bind="data?.author"
            class="cursor-default"
            @click="() => authorEl?.scrollIntoView()"
          />
        </div>
        <div class="flex flex-row items-center gap-4">
          <p
            v-if="data?.date"
            class="flex flex-row items-center gap-1 typ-sublabel"
          >
            <UIcon
              name="material-symbols:calendar-today-rounded"
              class="text-primary"
            /> {{ formatDate(data.date) }}
          </p>
          <p
            v-if="data?.minRead"
            class="flex flex-row items-center gap-1 typ-sublabel"
          >
            <UIcon
              name="material-symbols:alarm-rounded"
              class="text-primary"
            /> {{ data.minRead }} MIN READ
          </p>
        </div>
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
      <p class="font-semibold">
        Related articles
      </p>
      <UBlogPosts id="related-articles">
        <UBlogPost
          v-for="article in links"
          :key="article.path"
          :title="article.title"
          :image="article.image"
          :authors="[article.author]"
          :badge="Math.abs(new Date().getTime() - new Date(article?.date).getTime()) < 8.64e7 * 7 ? { label: 'New', color: 'primary' } : undefined"
          :date="article.date"
          :to="article.path"
          variant="subtle"
        />
      </UBlogPosts>

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
const route = useRoute()
const authorEl = ref<HTMLElement | null>()
const clipboard = useClipboard()
const toast = useToast()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const { data } = await useAsyncData(route.path, () => queryCollection('writing').path(route.path).first())
if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: links } = await useAsyncData(`linked-${route.path}`, async () => {
  const res = await queryCollection('writing').where('path', 'NOT LIKE', data.value?.path).all()
  return res.slice(0, 5)
})
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('writing', route.path, {
    fields: ['description']
  })
})

if (data.value.image) {
  defineOgImage({ url: data.value.image })
} else {
  defineOgImageComponent('Blog', {
    headline: data.value?.title
  })
}

async function copyLink() {
  await clipboard.copy(window.location.href)
  toast.add({ title: 'Copied to clipboard', icon: 'material-symbols:check-circle-rounded', color: 'success' })
}
async function share() {
  await navigator.share({ url: route.fullPath })
}

onMounted(() => {
  const contentEl = document.getElementById('content')
  authorEl.value = contentEl?.querySelector('#author-about')
})
</script>

<style lang="css">
@reference "~/assets/css/main.css";

@variant max-lg {
    * {
        scroll-margin-top: calc(var(--ui-header-height) + 4rem) !important;
    }
}
</style>
