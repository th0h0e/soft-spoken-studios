<template>
  <div>
    <UiContainer>
      <div class="grid items-start gap-8 lg:grid-cols-8">
        <!-- Main Content Column -->
        <div class="space-y-8 lg:col-span-5">
          <BookCover />

          <Header
            :headline="$t('global.tagline')"
            :title="$t('global.site_name')"
            :description="$t('global.description')"
          />

          <!-- Core Message -->
          <UiCard>
            <UiCardContent class="py-4">
              <p class="text-xl leading-relaxed font-medium">
                {{ $t("home.hero.title") }} {{ $t("home.hero.subtitle") }}
              </p>
            </UiCardContent>
          </UiCard>

          <!-- 16:9 Video/Image Section -->
          <div>
            <UiAspectRatio :ratio="16 / 9" class="bg-muted mb-2 overflow-hidden rounded">
              <div class="text-muted-foreground flex h-full w-full items-center justify-center">
                Video placeholder
              </div>
            </UiAspectRatio>
            <p class="text-muted-foreground text-xs">Client project - Brand storytelling video</p>
          </div>

          <!-- What We Do -->
          <div>
            <h2 class="mb-6 text-2xl font-semibold">{{ $t("home.services.title") }}</h2>

            <div class="grid gap-8 md:grid-cols-2">
              <div>
                <UiDivider class="mb-4" />
                <h3 class="mb-3 text-xl font-medium">
                  {{ $t("home.services.copywriting.title") }}
                </h3>
                <p class="text-muted-foreground">
                  {{ $t("home.services.copywriting.description") }}
                </p>
              </div>

              <div>
                <UiDivider class="mb-4" />
                <h3 class="mb-3 text-xl font-medium">{{ $t("home.services.video.title") }}</h3>
                <p class="text-muted-foreground">
                  {{ $t("home.services.video.description") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Philosophy -->
          <UiCard>
            <UiCardContent class="py-4">
              <h2 class="mb-4 text-xl font-semibold">Our approach</h2>
              <p class="text-muted-foreground leading-relaxed">
                In a world of loud, shallow communication, we believe in the power of being soft
                spoken. When you choose your words carefully, the impression is much greater. It
                might not generate the highest numbers, but the true impact—the kind that can't be
                measured by analytics—is much, much deeper.
              </p>
            </UiCardContent>
          </UiCard>

          <!-- Gallery Section -->
          <div>
            <UiDivider class="mb-6" />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <!-- Photo 1 -->
              <div class="group cursor-pointer">
                <UiAspectRatio :ratio="4 / 5" class="mb-3">
                  <NuxtImg
                    src="/images/3334f4a0741954580a818e303927dfcd.jpg"
                    alt="Featured work"
                    class="h-full w-full rounded object-cover transition-opacity group-hover:opacity-90"
                    width="400"
                    height="500"
                  />
                </UiAspectRatio>
                <h3 class="mb-1 font-medium">Creative Work</h3>
                <p class="text-muted-foreground text-sm">Visual storytelling in action</p>
              </div>

              <!-- Photo 2 -->
              <div class="group cursor-pointer">
                <UiAspectRatio :ratio="4 / 5" class="mb-3">
                  <NuxtImg
                    src="/images/8bfedd83aec8466a4708d60ec299d164.jpg"
                    alt="Featured work"
                    class="h-full w-full rounded object-cover transition-opacity group-hover:opacity-90"
                    width="400"
                    height="500"
                  />
                </UiAspectRatio>
                <h3 class="mb-1 font-medium">Professional Projects</h3>
                <p class="text-muted-foreground text-sm">Client work and collaborations</p>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <UiDivider />

          <!-- Project Index -->
          <ProjectIndex />
        </div>

        <!-- Right Column -->
        <div class="space-y-8 lg:sticky lg:top-4 lg:col-span-3">
          <SideCard v-for="article in recentArticles" :key="article._id">
            <template #title>{{ article.title }}</template>
            <template #content>{{ article.description || article.excerpt }}</template>
          </SideCard>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
  // Get current locale for i18n content
  const { locale } = useI18n();

  // Fetch the latest 3 articles for the side cards - locale-specific
  const { data: recentArticles } = await useAsyncData(
    `recent-articles-${locale.value}`,
    async () => {
      const collectionName = `articles_${locale.value}`;
      try {
        const articles = await queryCollection(collectionName).all();
        return articles
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
      } catch (error) {
        // Fallback to legacy collection if locale-specific doesn't exist
        console.warn(`Collection ${collectionName} not found, falling back to 'articles'`);
        const articles = await queryCollection("articles").all();
        return articles
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
      }
    }
  );
</script>
