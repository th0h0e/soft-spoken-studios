<script setup lang="ts">
  import { joinURL, withLeadingSlash } from "ufo";
  import type { Collections } from "@nuxt/content";

  const route = useRoute();

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? (route.params.slug as string[])
      : [route.params.slug as string]
  );
  const path = computed(() => withLeadingSlash(joinURL('/articles', ...slug.value)));

  // Query only the articles collection
  const { data: page } = await useAsyncData(
    `article-${route.path}`,
    async () => {
      const result = await queryCollection('articles' as keyof Collections)
        .path(path.value)
        .first();

      if (!result) {
        throw createError({ statusCode: 404, statusMessage: "Article not found" });
      }

      return result;
    },
    {
      watch: [() => route.path]
    }
  );

  // Set page head for SEO
  useHead({
    title: page.value.title,
    meta: [{ name: "description", content: page.value.description || page.value.preview }],
  });

  // Format date utility
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString.toString();
    }
  };
</script>

<template>
  <div v-if="page">
    <UiContainer>
      <div class="grid items-start gap-8 lg:grid-cols-8">
        <!-- Left Column (2/8) -->
        <div class="lg:sticky lg:top-8 lg:col-span-2">
          <div class="space-y-6">
            <!-- Back Navigation -->
            <NuxtLink
              to="/blog"
              class="text-muted hover:text-primary group inline-flex items-center transition-colors"
            >
              <Icon
                name="lucide:arrow-left"
                class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              />
              Back to Blog
            </NuxtLink>

            <!-- Article Meta -->
            <div class="space-y-4">
              <div class="text-muted-foreground flex items-center gap-2 text-xs">
                <Icon name="lucide:calendar" class="h-3 w-3" />
                <span>{{ formatDate(page.date) }}</span>
              </div>

              <!-- Tags Section -->
              <div v-if="page.tags?.length" class="space-y-2">
                <span class="text-xs font-medium">Tags:</span>
                <div class="flex flex-wrap gap-2">
                  <UiBadge v-for="tag in page.tags" :key="tag" variant="outline" class="text-xs">
                    {{ tag }}
                  </UiBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (6/8) -->
        <div class="lg:col-span-6">
          <!-- Hero Image (support both new and legacy formats) -->
          <div v-if="page.heroImage || page.image" class="mb-8 overflow-hidden rounded-lg">
            <UiDivider class="mb-6" />
            <UiAspectRatio :ratio="16 / 9">
              <NuxtImg
                :src="page.heroImage || page.image"
                :alt="page.heroImageDescription || page.description || `${page.title} hero image`"
                class="h-full w-full object-cover"
                width="800"
                height="450"
              />
            </UiAspectRatio>
          </div>

          <!-- Article Header -->
          <header class="mb-12">
            <h1 class="mb-6 text-2xl leading-tight font-semibold">
              {{ page.title }}
            </h1>
            <p v-if="page.description || page.excerpt" class="text-muted-foreground mb-6">
              {{ page.description || page.excerpt }}
            </p>
            <UiSeparator />
          </header>

          <!-- Article Content -->
          <article class="mb-12 space-y-6 text-base leading-relaxed">
            <ContentRenderer :value="page" />
          </article>

          <!-- Navigation Footer -->
          <div class="mt-16 border-t pt-8">
            <NuxtLink to="/blog">
              <UiButton variant="ghost" class="group">
                <Icon
                  name="lucide:arrow-left"
                  class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                />
                All Articles
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
