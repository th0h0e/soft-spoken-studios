<script setup lang="ts">
import { Motion } from 'motion-v'

const route = useRoute()
const { isWritingArticle } = usePageType()
const clipboard = useClipboard()
const toast = useToast()

// Fetch article previews for default sidebar
const { data: articles } = await useAsyncData('sidebar-articles', () =>
  queryCollection('writing').order('date', 'DESC').limit(3).all()
)

// Fetch current article's ToC when on article page
const { data: currentArticle } = await useAsyncData(
  () => `article-toc-${route.path}`,
  () => queryCollection('writing').path(route.path).first(),
  { watch: [() => route.path] }
)

// Share functionality
async function copyLink() {
  await clipboard.copy(window.location.href)
  toast.add({ title: 'Copied to clipboard', icon: 'lucide:check-circle', color: 'success' })
}

async function share() {
  await navigator.share({ url: route.fullPath })
}

const shareMenuItems = [
  {
    label: 'Copy URL',
    icon: 'lucide:link',
    onSelect: copyLink
  }
]
</script>

<template>
  <!-- Article ToC sidebar (shown on writing article pages) -->
  <div
    v-if="isWritingArticle && currentArticle"
    class="flex flex-col gap-4 py-8 px-4"
  >
    <UPageAnchors
      :links="[
        { label: 'YouTube tutorial', icon: 'lucide:youtube', to: 'https://www.youtube.com/@matteo-beltrame', target: '_blank' },
        { label: 'All posts', icon: 'lucide:newspaper', to: '/writing' }
      ]"
    />
    <USeparator type="dotted" />
    <UContentToc
      v-if="currentArticle.body?.toc?.links"
      :links="currentArticle.body.toc.links"
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
      <UDropdownMenu :items="shareMenuItems">
        <UButton
          icon="lucide:chevron-down"
          variant="subtle"
          color="neutral"
        />
      </UDropdownMenu>
    </UFieldGroup>
  </div>

  <!-- Article previews sidebar (shown on other pages) -->
  <div
    v-else
    class="flex flex-col gap-0"
  >
    <Motion
      v-for="article in articles"
      :key="article.path"
      :initial="{ opacity: 0 }"
      :hover="{ opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 300, damping: 80 }"
      class="relative"
    >
      <div class="absolute inset-0 bg-elevated/20 pointer-events-none" />
      <UCard variant="outline">
        <NuxtLink
          :to="article.path"
          class="group block"
        >
          <h3 class="text-sm font-medium mb-1">
            {{ article.title }}
          </h3>
          <p class="text-sm text-muted line-clamp-2">
            {{ article.description }}
          </p>
        </NuxtLink>
      </UCard>
    </Motion>
  </div>
</template>
