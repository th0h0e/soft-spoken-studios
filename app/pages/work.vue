<script setup>
// Set page head
useHead({
  title: 'Work'
})

const { locale } = useI18n()

// Get all portfolio items for current locale
const { data: portfolio } = await useAsyncData(`portfolio-${locale.value}`, async () => {
  const collection = `portfolio_${locale.value}` as keyof Collections;
  return await queryCollection(collection).all();
})

// Sort portfolio by date (newest first) and separate featured items
const sortedPortfolio = computed(() => {
  if (!portfolio.value) return []
  return portfolio.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const featuredWork = computed(() => {
  return sortedPortfolio.value.filter(item => item.featured) || []
})

const regularWork = computed(() => {
  return sortedPortfolio.value.filter(item => !item.featured) || []
})
</script>

<template>
  <div>
    <UiContainer>
      <!-- Header -->
      <div class="text-center py-16">
        <h1 class="text-4xl font-bold mb-4">Our Work</h1>
        <p class="text-xl text-muted">Strategic storytelling through words and visuals</p>
      </div>

      <!-- Featured Work -->
      <section v-if="featuredWork.length" class="mb-16">
        <h2 class="text-2xl font-semibold mb-8">Featured Projects</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <UiCard v-for="project in featuredWork" :key="project._path" class="group">
            <NuxtLink :to="project._path" class="block">
              <div class="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <UiCardContent class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
                    {{ project.title }}
                  </h3>
                  <UiBadge v-if="project.client" variant="secondary" class="ml-2">
                    {{ project.client }}
                  </UiBadge>
                </div>
                <p class="text-muted mb-4 leading-relaxed">
                  {{ project.description }}
                </p>
                <time :datetime="project.date" class="text-sm text-muted">
                  {{ new Date(project.date).toLocaleDateString() }}
                </time>
              </UiCardContent>
            </NuxtLink>
          </UiCard>
        </div>
      </section>

      <!-- Regular Portfolio -->
      <section v-if="regularWork.length">
        <h2 class="text-2xl font-semibold mb-8">All Projects</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="project in regularWork" :key="project._path" class="group">
            <NuxtLink :to="project._path" class="block">
              <div class="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <UiCardContent class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                    {{ project.title }}
                  </h3>
                  <UiBadge v-if="project.client" variant="secondary" class="ml-2 text-xs">
                    {{ project.client }}
                  </UiBadge>
                </div>
                <p class="text-muted mb-4 text-sm leading-relaxed">
                  {{ project.description }}
                </p>
                <time :datetime="project.date" class="text-xs text-muted">
                  {{ new Date(project.date).toLocaleDateString() }}
                </time>
              </UiCardContent>
            </NuxtLink>
          </UiCard>
        </div>
      </section>

      <!-- Empty State -->
      <div v-if="!sortedPortfolio.length" class="text-center py-16">
        <h2 class="text-2xl font-semibold mb-4">Portfolio coming soon</h2>
        <p class="text-muted">We're curating our best work to share with you.</p>
      </div>
    </UiContainer>
  </div>
</template>