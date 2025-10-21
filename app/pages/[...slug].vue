<script setup lang="ts">
  import { joinURL, withLeadingSlash } from "ufo";
  import type { Collections } from "@nuxt/content";

  const route = useRoute();

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? (route.params.slug as string[])
      : [route.params.slug as string]
  );
  const path = computed(() => withLeadingSlash(joinURL(...slug.value)));
  const collection = computed(() => 'content' as keyof Collections);

  const { data: page } = await useAsyncData(
    // Use route path as key to ensure refetch on navigation
    () => `page-${route.path}`,
    async () => {
    console.log('[DEBUG] Looking for page at path:', path.value);

    // Check if this is an article route - query articles collection directly
    if (path.value.includes("/articles/")) {
      console.log('[DEBUG] Querying articles collection');
      try {
        const result = await queryCollection('articles' as keyof Collections).path(path.value).first();
        console.log('[DEBUG] Articles query result:', result);
        if (result) return result;
      } catch (e) {
        console.warn(`[DEBUG] Article query failed:`, e);
      }
    }

    // Check if this is a portfolio route
    if (path.value.includes("/portfolio/")) {
      console.log('[DEBUG] Querying portfolio collection');
      try {
        const result = await queryCollection('portfolio' as keyof Collections).path(path.value).first();
        console.log('[DEBUG] Portfolio query result:', result);
        if (result) return result;
      } catch (e) {
        console.warn(`[DEBUG] Portfolio query failed:`, e);
      }
    }

    // Try main content collection as fallback
    console.log('[DEBUG] Querying main content collection');
    try {
      const result = await queryCollection('content' as keyof Collections).path(path.value).first();
      console.log('[DEBUG] Content query result:', result);
      if (result) return result;
    } catch (error) {
      console.warn(`[DEBUG] Content query failed:`, error);
    }

    console.warn(`[DEBUG] Page not found in any collection:`, path.value);
    return null;
  },
  {
    // Watch route.path to refetch data when navigating between articles
    watch: [() => route.path]
  });

  if (!page.value) throw createError({ statusCode: 404, statusMessage: "Page not found" });

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
    <!-- Article Layout -->
    <div v-if="route.path.includes('/articles/')">
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
              <!-- Render markdown content -->
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

    <!-- Portfolio Layout -->
    <div v-else-if="route.path.includes('/portfolio/')">
      <UiContainer>
        <div class="grid items-start gap-8 lg:grid-cols-8">
          <!-- Left Column - Navigation (2/8) -->
          <div class="lg:sticky lg:top-8 lg:col-span-2">
            <div class="space-y-6">
              <!-- Back Navigation -->
              <NuxtLink
                to="/work"
                class="text-muted hover:text-primary group inline-flex items-center transition-colors"
              >
                <Icon
                  name="lucide:arrow-left"
                  class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                />
                Back to Work
              </NuxtLink>

              <!-- Project Meta -->
              <UiCard>
                <UiCardContent class="space-y-4 py-4">
                  <div v-if="page.date" class="space-y-1">
                    <p class="text-xs font-medium">Date</p>
                    <p class="text-muted-foreground text-sm">{{ formatDate(page.date) }}</p>
                  </div>

                  <UiDivider v-if="page.client" />

                  <div v-if="page.client" class="space-y-1">
                    <p class="text-xs font-medium">Client</p>
                    <p class="text-muted-foreground text-sm">{{ page.client }}</p>
                  </div>

                  <UiDivider v-if="page.meta?.category" />

                  <div v-if="page.meta?.category" class="space-y-1">
                    <p class="text-xs font-medium">Category</p>
                    <p class="text-muted-foreground text-sm">{{ page.meta.category }}</p>
                  </div>

                  <UiDivider v-if="page.meta?.services?.length" />

                  <div v-if="page.meta?.services?.length" class="space-y-2">
                    <p class="text-xs font-medium">Services</p>
                    <div class="flex flex-wrap gap-1">
                      <UiBadge
                        v-for="service in page.meta.services"
                        :key="service"
                        variant="secondary"
                        size="sm"
                      >
                        {{ service }}
                      </UiBadge>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>
            </div>
          </div>

          <!-- Right Column - Content (6/8) -->
          <div class="lg:col-span-6">
            <!-- Gallery -->
            <div class="mb-8">
              <PortfolioItem
                :images="[
                  { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: page.title },
                  { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: page.title },
                  { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: page.title },
                ]"
              />
            </div>

            <!-- Project Header -->
            <header class="mb-8">
              <h1 class="mb-4 text-3xl font-semibold">{{ page.title }}</h1>
              <p v-if="page.description" class="text-muted-foreground text-lg leading-relaxed">
                {{ page.description }}
              </p>
              <UiSeparator class="mt-6" />
            </header>

            <!-- Project Details -->
            <div class="space-y-8">
              <!-- Overview -->
              <UiCard v-if="page.meta?.overview">
                <UiCardHeader>
                  <UiCardTitle>Overview</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <p class="text-base leading-relaxed">{{ page.meta.overview }}</p>
                </UiCardContent>
              </UiCard>

              <!-- Challenge -->
              <UiCard v-if="page.meta?.challenges">
                <UiCardHeader>
                  <UiCardTitle>Challenge</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <p class="text-base leading-relaxed">{{ page.meta.challenges }}</p>
                </UiCardContent>
              </UiCard>

              <!-- Solution -->
              <UiCard v-if="page.meta?.solution">
                <UiCardHeader>
                  <UiCardTitle>Solution</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <p class="text-base leading-relaxed">{{ page.meta.solution }}</p>
                </UiCardContent>
              </UiCard>

              <!-- Results -->
              <UiCard v-if="page.meta?.results">
                <UiCardHeader>
                  <UiCardTitle>Results</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <p class="text-base leading-relaxed">{{ page.meta.results }}</p>
                </UiCardContent>
              </UiCard>
            </div>

            <!-- Navigation Footer -->
            <div class="mt-16 border-t pt-8">
              <NuxtLink to="/work">
                <UiButton variant="ghost" class="group">
                  <Icon
                    name="lucide:arrow-left"
                    class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                  />
                  All Projects
                </UiButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </UiContainer>
    </div>

    <!-- Default Content Layout -->
    <div v-else>
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>
