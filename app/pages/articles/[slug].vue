<script lang="ts" setup>
import type { Collections } from '@nuxt/content'
import { withLeadingSlash, joinURL } from 'ufo'

const route = useRoute()

const slug = computed(() => route.params.slug as string)
const path = computed(() => withLeadingSlash(joinURL('articles', slug.value)))

const { data: page } = await useAsyncData(path.value, async () =>
  await queryCollection('articles').path(path.value).first()
)

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

// Set page head for SEO
useHead({
  title: page.value.title,
  meta: [
    { name: 'description', content: page.value.description }
  ]
})

// Format date utility
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}
</script>

<template>
  <div>
    <UiContainer v-if="page" class="max-w-4xl mx-auto py-8">
      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink to="/blog" class="inline-flex items-center text-muted hover:text-primary transition-colors group">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </NuxtLink>
      </div>

      <!-- Article Header -->
      <header class="mb-12">
        <!-- Hero Image -->
        <div v-if="page.image" class="mb-8 rounded-lg overflow-hidden">
          <UiAspectRatio :ratio="16/9">
            <NuxtImg
              :src="page.image"
              :alt="`${page.title} hero image`"
              class="w-full h-full object-cover"
              width="800"
              height="450"
            />
          </UiAspectRatio>
        </div>

        <!-- Categories -->
        <div v-if="page.categories?.length" class="flex flex-wrap gap-2 mb-4">
          <UiBadge
            v-for="category in page.categories"
            :key="category"
            variant="secondary"
            class="text-xs"
          >
            {{ category }}
          </UiBadge>
        </div>

        <!-- Title -->
        <UiHeading as="h1" class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {{ page.title }}
        </UiHeading>

        <!-- Description -->
        <p v-if="page.description" class="text-xl text-muted mb-6 leading-relaxed">
          {{ page.description }}
        </p>

        <!-- Article Meta -->
        <div class="flex items-center gap-6 text-sm text-muted">
          <div class="flex items-center gap-2">
            <Icon name="lucide:calendar" class="w-4 h-4" />
            <span>{{ formatDate(page.date) }}</span>
          </div>
          <div v-if="page.readingTime" class="flex items-center gap-2">
            <Icon name="lucide:clock" class="w-4 h-4" />
            <span>{{ page.readingTime }} min read</span>
          </div>
        </div>

        <UiSeparator class="mt-8" />
      </header>

      <!-- Article Content -->
      <article class="mb-12 text-base leading-relaxed space-y-6">
        <ContentRenderer :value="page" />
      </article>

      <!-- Tags Section -->
      <footer v-if="page.tags?.length" class="mb-12">
        <UiSeparator class="mb-6" />
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-sm font-medium text-muted">Tags:</span>
          <div class="flex flex-wrap gap-2">
            <UiBadge
              v-for="tag in page.tags"
              :key="tag"
              variant="outline"
              class="text-xs"
            >
              {{ tag }}
            </UiBadge>
          </div>
        </div>
      </footer>

      <!-- Navigation Footer -->
      <div class="border-t pt-8 mt-16">
        <div class="flex items-center justify-between">
          <NuxtLink to="/blog">
            <UiButton variant="ghost" class="group">
              <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              All Articles
            </UiButton>
          </NuxtLink>

          <div class="flex items-center gap-4">
            <span class="text-sm text-muted">Share this article</span>
            <div class="flex gap-2">
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:twitter" class="w-4 h-4" />
              </UiButton>
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:linkedin" class="w-4 h-4" />
              </UiButton>
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:link" class="w-4 h-4" />
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- 404 Error State -->
    <UiContainer v-else class="max-w-2xl mx-auto py-16 text-center">
      <div class="mb-8">
        <Icon name="lucide:file-x" class="w-16 h-16 mx-auto text-muted mb-4" />
        <UiHeading as="h1" class="text-2xl font-bold mb-2">
          Article Not Found
        </UiHeading>
        <p class="text-muted">
          The article you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <NuxtLink to="/blog">
        <UiButton>
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Back to Blog
        </UiButton>
      </NuxtLink>
    </UiContainer>
  </div>
</template>