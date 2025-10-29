<script setup lang="ts">
  import { joinURL, withLeadingSlash } from "ufo";
  import type { Collections } from "@nuxt/content";

  // Use the new layout
  definePageMeta({
    layout: 'new-layout'
  });

  const route = useRoute();

  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? (route.params.slug as string[])
      : [route.params.slug as string]
  );
  const path = computed(() => withLeadingSlash(joinURL('/portfolio', ...slug.value)));

  // Query only the portfolio collection
  type PortfolioItem = Collections['portfolio'];

  const { data: page } = await useAsyncData(
    `portfolio-${route.path}`,
    async () => {
      const result = await queryCollection('portfolio')
        .path(path.value)
        .first() as PortfolioItem | null;

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
    title: page.value?.title || '',
    meta: [{ name: "description", content: page.value?.description || '' }],
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
    <div class="space-y-8">
      <!-- Gallery -->
      <div v-if="page?.gallery?.length" class="mb-8">
            <PortfolioItem
              :images="page.gallery.map(img => ({ src: img.src, alt: page?.title || '' }))"
            />
          </div>

          <UiSeparator class="my-8" />

          <!-- Project Header -->
          <header class="mb-8">
            <h1 class="mb-4 text-3xl font-semibold">{{ page?.title }}</h1>
            <p v-if="page?.description" class="text-muted-foreground text-lg leading-relaxed">
              {{ page.description }}
            </p>
          </header>

          <UiSeparator class="my-8" />

          <!-- Project Meta -->
          <UiCard class="mb-8">
            <UiCardContent class="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
              <div v-if="page?.date" class="space-y-1">
                <p class="text-xs font-medium">Date</p>
                <p class="text-muted-foreground text-sm">{{ formatDate(page.date) }}</p>
              </div>

              <div v-if="page?.client" class="space-y-1">
                <p class="text-xs font-medium">Client</p>
                <p class="text-muted-foreground text-sm">{{ page.client }}</p>
              </div>

              <div v-if="page?.status" class="space-y-1">
                <p class="text-xs font-medium">Status</p>
                <UiBadge
                  :variant="page.status === 'completed' ? 'default' : page.status === 'in-progress' ? 'secondary' : 'outline'"
                >
                  {{ page.status }}
                </UiBadge>
              </div>
            </UiCardContent>
          </UiCard>

          <UiSeparator class="my-8" />

          <!-- Project Details -->
          <div class="space-y-8">
            <!-- Overview -->
            <UiCard v-if="page?.overview">
              <UiCardHeader>
                <UiCardTitle>Overview</UiCardTitle>
              </UiCardHeader>
              <UiCardContent>
                <p class="text-base leading-relaxed">{{ page.overview }}</p>
              </UiCardContent>
            </UiCard>
          </div>

          <!-- Markdown Content (uses Prose components) -->
          <article v-if="page" class="mt-8 space-y-6 text-base leading-relaxed">
            <ContentRenderer :value="page" />
          </article>

          <UiSeparator class="my-8" />

          <!-- Hero Image -->
          <div v-if="page?.image?.src" class="mt-8 mb-8 overflow-hidden rounded-lg">
            <UiAspectRatio :ratio="16 / 9">
              <NuxtImg
                :src="page.image.src"
                :alt="`${page?.title || 'Project'} hero image`"
                class="h-full w-full object-cover"
                width="800"
                height="450"
              />
            </UiAspectRatio>
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
</template>
