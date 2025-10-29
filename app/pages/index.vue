<template>
  <div class="space-y-8">
    <SectionsBookCover />

    <Header
      headline="We can write your talk, and capture your walk"
      title="Soft Spoken Studios"
      description="An at your service creative agency, specializing in telling stories through copywriting and video."
    />

    <!-- Core Message -->
    <UiCard>
      <UiCardContent class="py-4">
        <p class="text-xl leading-relaxed font-medium">
          We can write your talk, and capture your walk. At Soft Spoken Studios, we believe that the most powerful communication comes from understanding rather than overwhelming.
        </p>
      </UiCardContent>
    </UiCard>

    <!-- YouTube Video Section -->
    <YouTubeVideo
      :url="settings?.video?.homepage || appConfig.video?.homepage"
      :thumbnail="settings?.video?.thumbnail"
    />

    <!-- What We Do -->
    <div>
      <h2 class="mb-6 text-2xl font-semibold">What we do</h2>

      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <UiDivider class="mb-4" />
          <h3 class="mb-3 text-xl font-medium">Copywriting</h3>
          <p class="text-muted-foreground">
            Words that matter. We craft copy that speaks directly to your audience without unnecessary noise. Every word is chosen with purpose.
          </p>
        </div>

        <div>
          <UiDivider class="mb-4" />
          <h3 class="mb-3 text-xl font-medium">Video</h3>
          <p class="text-muted-foreground">
            Stories that move. We create videos that capture authentic moments and communicate your message with clarity and impact.
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
    <SectionsImages :items="galleryItems" />

    <!-- Project Index -->
    <SectionsProjectIndex />
  </div>
</template>

<script setup>
// Use the new layout
definePageMeta({
  layout: 'new-layout'
});

// Access app config as fallback
const appConfig = useAppConfig();

// Gallery items for the Images section
const galleryItems = [
  {
    src: '/images/3334f4a0741954580a818e303927dfcd.jpg',
    alt: 'Featured work',
    title: 'Creative Work'
  },
  {
    src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg',
    alt: 'Featured work',
    title: 'Professional Projects'
  }
];

// Fetch settings from Nuxt Content
const { data: settings } = await useAsyncData(
  'homepage-settings',
  () => queryCollection('settings').first()
);
</script>
