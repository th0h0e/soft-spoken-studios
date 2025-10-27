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
    <UiContainer class="md:!px-0">
      <div class="grid items-start gap-4 lg:grid-cols-8">
        <!-- Left Column (5/8) - Main Article Content -->
        <div class="lg:col-span-5">
          <!-- Hero Image -->
          <div v-if="page.image?.src" class="mb-8 overflow-hidden rounded-lg">
            <UiAspectRatio :ratio="16 / 9">
              <NuxtImg
                :src="page.image.src"
                :alt="page.image.alt || `${page.title} hero image`"
                class="h-full w-full object-cover"
                width="800"
                height="450"
              />
            </UiAspectRatio>
          </div>

          <UiSeparator class="my-8" />

          <!-- Article Header -->
          <header class="mb-8">
            <h1 class="mb-4 text-3xl font-semibold">
              {{ page.title }}
            </h1>
            <p v-if="page.description || page.excerpt" class="text-muted-foreground text-lg leading-relaxed">
              {{ page.description || page.excerpt }}
            </p>
          </header>

          <UiSeparator class="my-8" />

          <!-- Article Meta -->
          <UiCard class="mb-8">
            <UiCardContent class="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4">
              <div v-if="page.date" class="space-y-1">
                <p class="text-xs font-medium">Date</p>
                <p class="text-muted-foreground text-sm">{{ formatDate(page.date) }}</p>
              </div>

              <div v-if="page.author?.name" class="space-y-1">
                <p class="text-xs font-medium">Author</p>
                <p class="text-muted-foreground text-sm">{{ page.author.name }}</p>
              </div>

              <div v-if="page.category" class="space-y-1">
                <p class="text-xs font-medium">Category</p>
                <p class="text-muted-foreground text-sm">{{ page.category }}</p>
              </div>

              <div v-if="page.readingTime" class="space-y-1">
                <p class="text-xs font-medium">Reading Time</p>
                <p class="text-muted-foreground text-sm">{{ page.readingTime }}</p>
              </div>

              <div v-if="page.tags?.length" class="col-span-2 space-y-2 sm:col-span-3 md:col-span-4">
                <p class="text-xs font-medium">Tags</p>
                <div class="flex flex-wrap gap-2">
                  <UiBadge v-for="tag in page.tags" :key="tag" variant="outline">
                    {{ tag }}
                  </UiBadge>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiSeparator class="my-8" />

          <!-- Article Content -->
          <article class="mb-12 space-y-6 text-base leading-relaxed">
            <ContentRenderer :value="page" />
          </article>

          <UiSeparator class="my-8" />

          <!-- Footer Image -->
          <div v-if="page.footerImage?.src" class="mb-8 overflow-hidden rounded-lg">
            <UiAspectRatio :ratio="16 / 9">
              <NuxtImg
                :src="page.footerImage.src"
                :alt="page.footerImage.alt || `${page.title} footer image`"
                class="h-full w-full object-cover"
                width="800"
                height="450"
              />
            </UiAspectRatio>
          </div>

          <!-- Text 1 -->
          <div v-if="page.text1" class="mb-8">
            <p class="text-base leading-relaxed">{{ page.text1 }}</p>
          </div>

          <!-- Text 3 -->
          <div v-if="page.text3" class="mb-8">
            <p class="text-base leading-relaxed">{{ page.text3 }}</p>
          </div>

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

        <!-- Right Column (3/8) - Sidebar -->
        <div class="lg:sticky lg:top-8 lg:col-span-3">
          <!-- Text 2 -->
          <div v-if="page.text2" class="text-sm leading-relaxed">
            <p>{{ page.text2 }}</p>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
