<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { withLeadingSlash, joinURL } from 'ufo'

const route = useRoute()
const { locale, localeProperties } = useI18n()

const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug as string[] : [route.params.slug as string])
const path = computed(() => withLeadingSlash(joinURL(locale.value, ...slug.value)))
const collection = computed(() => `content_${locale.value}` as keyof Collections)

const { data: page } = await useAsyncData(path.value, async () => {
  try {
    // Try to get from main content collection first
    return await queryCollection(collection.value).path(path.value).first()
  } catch (error) {
    // If not found, try specific collections based on path
    if (path.value.includes('/articles/')) {
      const articleCollection = `articles_${locale.value}` as keyof Collections
      try {
        return await queryCollection(articleCollection).path(path.value).first()
      } catch (e) {
        console.warn(`Article not found in ${articleCollection}:`, path.value)
      }
    }

    if (path.value.includes('/portfolio/')) {
      const portfolioCollection = `portfolio_${locale.value}` as keyof Collections
      try {
        return await queryCollection(portfolioCollection).path(path.value).first()
      } catch (e) {
        console.warn(`Portfolio not found in ${portfolioCollection}:`, path.value)
      }
    }

    console.warn(`Page not found in any collection:`, path.value)
    return null
  }
})

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

// Set page head for SEO
useHead({
  title: page.value.title,
  meta: [
    { name: 'description', content: page.value.description || page.value.preview }
  ]
})

// Format date utility
const formatDate = (dateString: string | Date) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString.toString()
  }
}
</script>

<template>
  <div v-if="page">
    <!-- Article Layout -->
    <div v-if="route.path.includes('/articles/')">
      <UiContainer>
        <div class="grid lg:grid-cols-8 gap-8 items-start">
          <!-- Left Column (2/8) -->
          <div class="lg:col-span-2 lg:sticky lg:top-8">
            <div class="space-y-6">
              <!-- Back Navigation -->
              <NuxtLink :to="localePath('/blog')" class="inline-flex items-center text-muted hover:text-primary transition-colors group">
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
            <div v-if="page.heroImage" class="mb-8 rounded-lg overflow-hidden">
              <UiDivider class="mb-6" />
              <UiAspectRatio :ratio="16/9">
                <NuxtImg
                  :src="page.heroImage"
                  :alt="page.heroImageDescription || `${page.title} hero image`"
                  class="w-full h-full object-cover"
                  width="800"
                  height="450"
                />
              </UiAspectRatio>
            </div>

            <!-- Article Header -->
            <header class="mb-12">
              <h1 class="text-2xl font-semibold mb-6 leading-tight">
                {{ page.title }}
              </h1>
              <UiSeparator />
            </header>

            <!-- Article Content -->
            <article class="mb-12 text-base leading-relaxed space-y-8">
              <!-- First Paragraph -->
              <p v-if="page.paragraphOne" class="text-foreground">
                {{ page.paragraphOne }}
              </p>

              <!-- Content Image -->
              <div v-if="page.contentImage" class="my-8">
                <UiAspectRatio :ratio="4/3" class="rounded-lg overflow-hidden">
                  <NuxtImg
                    :src="page.contentImage"
                    :alt="page.contentImageDescription || 'Article content image'"
                    class="w-full h-full object-cover"
                    width="600"
                    height="450"
                  />
                </UiAspectRatio>
                <p v-if="page.contentImageDescription" class="text-xs text-muted-foreground mt-2 text-center">
                  {{ page.contentImageDescription }}
                </p>
              </div>

              <!-- Second Paragraph -->
              <p v-if="page.paragraphTwo" class="text-foreground">
                {{ page.paragraphTwo }}
              </p>

              <!-- Sources Section -->
              <div v-if="page.sources?.length" class="mt-12 pt-8 border-t">
                <h3 class="text-lg font-semibold mb-4">Sources & References</h3>
                <ul class="space-y-2">
                  <li v-for="source in page.sources" :key="source.url" class="text-sm">
                    <a
                      :href="source.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary hover:underline"
                    >
                      {{ source.title }}
                    </a>
                    <p v-if="source.description" class="text-muted-foreground text-xs mt-1">
                      {{ source.description }}
                    </p>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Navigation Footer -->
            <div class="border-t pt-8 mt-16">
              <NuxtLink :to="localePath('/blog')">
                <UiButton variant="ghost" class="group">
                  <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  All Articles
                </UiButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </UiContainer>
    </div>

    <!-- Portfolio Layout -->
    <div v-else-if="route.path.includes('/portfolio/')">
      <div>
        <!-- Back Button -->
        <NuxtLink :to="localePath('/work')">
          ← Back to Portfolio
        </NuxtLink>

        <!-- Project Header -->
        <h1>{{ page.title }}</h1>

        <!-- Meta Information -->
        <div>
          <span>{{ formatDate(page.date) }}</span>
          <span v-if="page.client">Client: {{ page.client }}</span>
        </div>

        <!-- Project Content -->
        <ContentRenderer :value="page" />

        <!-- Navigation -->
        <div>
          <NuxtLink :to="localePath('/work')">
            ← All Projects
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Default Content Layout -->
    <div v-else>
      <ContentRenderer
        :dir="localeProperties?.dir ?? 'ltr'"
        :value="page"
      />
    </div>
  </div>
</template>

