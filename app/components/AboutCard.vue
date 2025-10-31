<template>
  <UiCard :class="['px-2 py-12 flex flex-col', showImage ? 'h-screen' : '']">
    <!-- Header Section - Always visible -->
    <div class="flex-shrink-0">
      <UiCardHeader class="text-center">
        <div class="mb-4 flex justify-center">
          <UiAvatar class="h-20 w-20 sm:h-24 sm:w-24">
            <UiAvatarFallback class="text-xl sm:text-2xl">TH</UiAvatarFallback>
          </UiAvatar>
        </div>
        <UiCardTitle class="mb-6 text-2xl sm:text-3xl line-clamp-3">About Soft Spoken</UiCardTitle>
      </UiCardHeader>
      <UiCardContent v-if="!showImage" class="text-center">
        <UiButton
          size="sm"
          @click="showImage = true"
        >
          {{ appConfig.cta?.getInTouch || 'Get In Touch' }}
        </UiButton>
      </UiCardContent>
    </div>

    <!-- Expanded Content Section with Motion Group for child animations -->
    <ClientOnly>
      <AnimatePresence mode="wait">
        <div v-if="showImage" class="flex-1 flex flex-col">
          <MotionGroup
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: 20, opacity: 0 }"
            :transition="{ duration: 0.6, ease: 'easeInOut' }"
            class="flex-1 flex flex-col"
          >
            <!-- Textarea Section -->
            <div class="my-6 flex-1 flex flex-col">
              <div class="flex-1 mb-4">
                <UiTextarea
                  v-model="textareaContent"
                  placeholder="Plase add text area here"
                  class="h-full"
                />
              </div>
              <div class="flex gap-3">
                <UiButton class="flex-1" size="sm">
                  {{ appConfig.cta?.send || 'Send' }}
                </UiButton>
                <UiButton variant="outline" class="flex-1" size="sm" @click="showImage = false">
                  {{ appConfig.cta?.close || 'Close' }}
                </UiButton>
              </div>
            </div>

            <!-- Image Section -->
            <div class="mt-6 overflow-hidden rounded-md">
              <UiAspectRatio :ratio="4 / 5">
                <NuxtImg
                  src="/IMG_6637.jpg"
                  alt="Behind Soft Spoken Studios"
                  class="h-full w-full object-cover"
                  width="320"
                  height="400"
                />
              </UiAspectRatio>
              <div class="mt-3 text-left">
                <h4 class="font-semibold">Behind Soft Spoken Studios</h4>
                <p class="text-muted-foreground mt-2 text-sm">
                  Thoughtful communication over loud marketing. Quality over noise.
                </p>
              </div>
            </div>
          </MotionGroup>
        </div>
      </AnimatePresence>
    </ClientOnly>
  </UiCard>
</template>

<script setup lang="ts">
  // Access app config for global contact information
  const appConfig = useAppConfig();

  // Image visibility state
  const showImage = ref(false);

  // Textarea content
  const textareaContent = ref("");
</script>
