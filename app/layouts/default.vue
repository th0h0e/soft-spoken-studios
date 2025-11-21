<script setup lang="ts">
import appMeta from '../app.meta'

const navOpen = ref(false)
const tocOpen = ref(false)
const { isWritingArticle } = usePageType()
</script>

<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
      <!-- LEFT SIDEBAR (desktop only) -->
      <aside class="hidden lg:block lg:col-span-2 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pr-px">
        <Navigation />
      </aside>

      <!-- CENTER CONTENT -->
      <main class="lg:col-span-7">
        <!-- Mobile navigation collapsible -->
        <div class="lg:hidden border-b border-default">
          <UCollapsible
            v-model:open="navOpen"
            class="px-4 py-3"
          >
            <UButton
              class="group w-full justify-between"
              label="Navigation"
              color="neutral"
              variant="ghost"
              trailing-icon="lucide:chevron-down"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
            />

            <template #content>
              <div class="pt-2 pb-4">
                <Navigation />
              </div>
            </template>
          </UCollapsible>
        </div>

        <!-- Mobile ToC collapsible (article pages only) -->
        <div
          v-if="isWritingArticle && $slots['mobile-toc']"
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
              trailing-icon="lucide:chevron-down"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
            />

            <template #content>
              <div class="pt-2 pb-4">
                <slot name="mobile-toc" />
              </div>
            </template>
          </UCollapsible>
        </div>

        <slot />
        <AppFooter />
      </main>

      <!-- RIGHT SIDEBAR (desktop only) -->
      <aside class="hidden lg:block lg:col-span-3 lg:sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto pl-px">
        <!-- Article sidebar: ToC and links -->
        <div
          v-if="isWritingArticle && $slots.right"
          class="py-8 px-4"
        >
          <slot name="right" />
        </div>

        <!-- Default sidebar: Card -->
        <UCard
          v-else
          variant="outline"
          class="h-full"
          :ui="{
            root: 'flex flex-col h-full',
            body: 'flex-1 !p-0',
            footer: 'bg-elevated/30 py-4'
          }"
        >
          <Card />

          <template #footer>
            <Copy :content="appMeta.contactEmail" />
          </template>
        </UCard>
      </aside>
    </div>
  </div>
</template>
