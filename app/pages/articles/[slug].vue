<script lang="ts" setup>
import type { Collections } from '@nuxt/content'
import { withLeadingSlash, joinURL } from 'ufo'

const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => route.params.slug as string)
const path = computed(() => withLeadingSlash(joinURL('articles', slug.value)))

const { data: page } = await useAsyncData(`article-${slug.value}-${locale.value}`, async () => {
  const collectionName = `articles_${locale.value}`
  try {
    return await queryCollection(collectionName).path(path.value).first()
  } catch (error) {
    // Fallback to legacy collection if locale-specific doesn't exist
    console.warn(`Collection ${collectionName} not found, falling back to 'articles'`)
    return await queryCollection('articles').path(path.value).first()
  }
})

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
    <UiContainer v-if="page">
      <div class="grid lg:grid-cols-8 gap-8 items-start">
        <!-- Left Column (2/8) -->
        <div class="lg:col-span-2 lg:sticky lg:top-8">
          <div class="space-y-6">
            <!-- Back Navigation -->
            <NuxtLink to="/blog" class="inline-flex items-center text-muted hover:text-primary transition-colors group">
              <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </NuxtLink>

            <!-- Article Meta -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="lucide:calendar" class="w-3 h-3" />
                <span>{{ formatDate(page.date) }}</span>
              </div>

              <!-- Tags Section -->
              <div v-if="page.tags?.length" class="space-y-2">
                <span class="text-xs font-medium">Tags:</span>
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
            </div>
          </div>
        </div>

        <!-- Right Column (6/8) -->
        <div class="lg:col-span-6">
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

          <!-- Article Header -->
          <header class="mb-12">
            <!-- Title -->
            <h1 class="text-2xl font-semibold mb-6 leading-tight">
              {{ page.title }}
            </h1>

            <!-- Description -->
            <p v-if="page.description" class="text-xl font-medium leading-relaxed mb-6">
              {{ page.description }}
            </p>

            <UiSeparator />
          </header>

          <!-- Article Content -->
          <article class="mb-12 text-muted-foreground leading-relaxed space-y-6">
            <ContentRenderer :value="page" />
          </article>

          <!-- Navigation Footer -->
          <div class="border-t pt-8 mt-16">
            <NuxtLink to="/blog">
              <UiButton variant="ghost" class="group">
                <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                All Articles
              </UiButton>
            </NuxtLink>
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