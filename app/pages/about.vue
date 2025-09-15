<script setup>
// Set page head
useHead({
  title: 'About'
})

const { locale } = useI18n()

// Get about page content
const { data: page } = await useAsyncData(`about-${locale.value}`, async () => {
  const collection = `content_${locale.value}` as keyof Collections;
  return await queryCollection(collection).path(`/${locale.value}/about`).first();
})

// Get about sections (skills, experience, etc.)
const { data: aboutSections } = await useAsyncData(`about-sections-${locale.value}`, async () => {
  const collection = `content_${locale.value}` as keyof Collections
  try {
    const sections = await queryCollection(collection).where({ _path: { $contains: `/about/` } }).all()
    return sections || []
  } catch (error) {
    return []
  }
})
</script>

<template>
  <div>
    <UiContainer>
      <div class="grid lg:grid-cols-8 gap-8 items-start">
        <!-- Left Column - About Me Card -->
        <div class="lg:col-span-2 lg:sticky lg:top-8">
          <UiCard class="p-8">
            <UiCardHeader class="text-center">
              <div class="flex justify-center mb-4">
                <UiAvatar class="size-20">
                  <UiAvatarImage src="/IMG_6637.jpg" alt="Profile" />
                  <UiAvatarFallback>SS</UiAvatarFallback>
                </UiAvatar>
              </div>
              <UiCardTitle class="text-xl">Soft Spoken Studios</UiCardTitle>
              <UiCardDescription class="text-sm text-muted">
                Creative Communication Agency
              </UiCardDescription>
            </UiCardHeader>

            <UiCardContent class="text-center">
              <p class="text-sm text-muted mb-4">
                Thoughtful communication over loud marketing. Quality over noise.
              </p>
            </UiCardContent>
          </UiCard>
        </div>

        <!-- Right Column - About Content -->
        <div class="lg:col-span-6">
          <div class="space-y-12">
            <!-- Main About Content -->
            <div v-if="page">
              <h1 class="text-3xl font-bold mb-6">{{ page.title }}</h1>
              <ContentRenderer :value="page" class="text-base leading-relaxed space-y-6" />
            </div>

            <!-- About Sections -->
            <div v-if="aboutSections?.length" class="space-y-8">
              <div v-for="section in aboutSections" :key="section._path" class="border-t pt-8">
                <h2 class="text-2xl font-semibold mb-4">{{ section.title }}</h2>
                <ContentRenderer :value="section" class="text-base leading-relaxed space-y-4" />
              </div>
            </div>

            <!-- Fallback Content -->
            <div v-if="!page && !aboutSections?.length">
              <h1 class="text-3xl font-bold mb-6">About Soft Spoken Studios</h1>
              <div class="text-base leading-relaxed space-y-6">
                <p>
                  We are a creative communication agency specializing in copywriting and video production.
                  Our approach focuses on thoughtful communication over loud marketing, delivering quality over noise.
                </p>
                <p>
                  We can write your talk, and capture your walk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>