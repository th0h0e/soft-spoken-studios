<script setup lang="ts">
  import { joinURL, withLeadingSlash } from "ufo";
  import type { Collections } from "@nuxt/content";

  const route = useRoute();

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? (route.params.slug as string[])
      : [route.params.slug as string]
  );
  const path = computed(() => withLeadingSlash(joinURL('/portfolio', ...slug.value)));

  // Query only the portfolio collection
  const { data: page } = await useAsyncData(
    `portfolio-${route.path}`,
    async () => {
      const result = await queryCollection('portfolio' as keyof Collections)
        .path(path.value)
        .first();

      if (!result) {
        throw createError({ statusCode: 404, statusMessage: "Project not found" });
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
    meta: [{ name: "description", content: page.value.description }],
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

          <!-- Markdown Content (uses Prose components) -->
          <article class="mt-8 space-y-6 text-base leading-relaxed">
            <ContentRenderer :value="page" />
          </article>

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
</template>
