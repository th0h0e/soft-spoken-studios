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
        variant="ghost"
        trailing-icon="i-feather-plus"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-135 transition-transform duration-200'
        }"
      />

      <template #content>
        <div class="pt-0 pb-2">
          <UContentToc
            :links="currentArticle.body.toc.links"
            highlight
            :open="true"
            :ui="{
              root: 'bg-transparent static max-h-none',
              container: 'py-0 border-0',
              trigger: 'hidden',
              title: 'hidden',
              trailingIcon: 'hidden',
              content: ''
            }"
          />
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
