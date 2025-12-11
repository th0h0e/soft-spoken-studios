<script setup lang="ts">
const route = useRoute()
const { isWritingArticle } = usePageType()

// Fetch current article's ToC when on article page
const { data: currentArticle } = await useAsyncData(
  () => `mobile-toc-${route.path}`,
  () => queryCollection('writing').path(route.path).first(),
  { watch: [() => route.path] }
)

const tocOpen = ref(false)
</script>

<template>
  <div
    v-if="isWritingArticle && currentArticle?.body?.toc?.links?.length"
    class="lg:hidden border-b border-default"
  >
    <UCollapsible
      v-model:open="tocOpen"
      class="px-4 py-3"
    >
      <UButton
        class="group w-full justify-between"
        label="On this page"
        color="neutral"
        variant="ghost"
        trailing-icon="i-feather-chevron-down"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
      />

      <template #content>
        <div class="pt-2 pb-4">
          <UContentToc
            :links="currentArticle.body.toc.links"
            highlight
            default-open
            :ui="{
              root: 'bg-transparent',
              container: 'py-0 border-0',
              trigger: 'hidden',
              content: ''
            }"
          />
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
