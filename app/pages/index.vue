<template>
  <div>
    <UiContainer>
      <div class="grid lg:grid-cols-8 gap-8 items-start">
        <!-- Main Content Column -->
        <div class="lg:col-span-5 space-y-8">
          <BookCover />
          
          <Header
            :headline="$t('global.tagline')"
            :title="$t('global.site_name')"
            :description="$t('global.description')"
          />

          <!-- Core Message -->
          <UiCard>
            <UiCardContent class="py-4">
              <p class="text-xl font-medium leading-relaxed">
                {{ $t('home.hero.title') }} {{ $t('home.hero.subtitle') }}
              </p>
            </UiCardContent>
          </UiCard>

          <!-- 16:9 Video/Image Section -->
          <div>
            <UiAspectRatio :ratio="16/9" class="rounded overflow-hidden bg-muted mb-2">
              <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                Video placeholder
              </div>
            </UiAspectRatio>
            <p class="text-xs text-muted-foreground">Client project - Brand storytelling video</p>
          </div>

          <!-- What We Do -->
          <div>
            <h2 class="text-2xl font-semibold mb-6">{{ $t('home.services.title') }}</h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <UiDivider class="mb-4" />
                <h3 class="text-xl font-medium mb-3">{{ $t('home.services.copywriting.title') }}</h3>
                <p class="text-muted-foreground">
                  {{ $t('home.services.copywriting.description') }}
                </p>
              </div>

              <div>
                <UiDivider class="mb-4" />
                <h3 class="text-xl font-medium mb-3">{{ $t('home.services.video.title') }}</h3>
                <p class="text-muted-foreground">
                  {{ $t('home.services.video.description') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Philosophy -->
          <UiCard>
            <UiCardContent class="py-4">
              <h2 class="text-xl font-semibold mb-4">Our approach</h2>
              <p class="text-muted-foreground leading-relaxed">
                In a world of loud, shallow communication, we believe in the power of being soft spoken. 
                When you choose your words carefully, the impression is much greater. It might not generate 
                the highest numbers, but the true impact—the kind that can't be measured by analytics—is 
                much, much deeper.
              </p>
            </UiCardContent>
          </UiCard>

          <!-- Gallery Section -->
          <div>
            <UiDivider class="mb-6" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Photo 1 -->
              <div class="group cursor-pointer">
                <UiAspectRatio :ratio="4/5" class="mb-3">
                  <NuxtImg
                    src="/images/3334f4a0741954580a818e303927dfcd.jpg"
                    alt="Featured work"
                    class="w-full h-full object-cover rounded group-hover:opacity-90 transition-opacity"
                    width="400"
                    height="500"
                  />
                </UiAspectRatio>
                <h3 class="font-medium mb-1">Creative Work</h3>
                <p class="text-muted-foreground text-sm">Visual storytelling in action</p>
              </div>

              <!-- Photo 2 -->
              <div class="group cursor-pointer">
                <UiAspectRatio :ratio="4/5" class="mb-3">
                  <NuxtImg
                    src="/images/8bfedd83aec8466a4708d60ec299d164.jpg"
                    alt="Featured work"
                    class="w-full h-full object-cover rounded group-hover:opacity-90 transition-opacity"
                    width="400"
                    height="500"
                  />
                </UiAspectRatio>
                <h3 class="font-medium mb-1">Professional Projects</h3>
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
        <div class="lg:col-span-3 lg:sticky lg:top-4 space-y-8">

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
const { locale } = useI18n()

// Fetch the latest 3 articles for the side cards - locale-specific
const { data: recentArticles } = await useAsyncData(`recent-articles-${locale.value}`, async () => {
  const collectionName = `articles_${locale.value}`
  try {
    const articles = await queryCollection(collectionName).all()
    return articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
  } catch (error) {
    // Fallback to legacy collection if locale-specific doesn't exist
    console.warn(`Collection ${collectionName} not found, falling back to 'articles'`)
    const articles = await queryCollection('articles').all()
    return articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
  }
})
</script>