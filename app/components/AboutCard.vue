<template>
  <UiCard class="p-4 sm:p-6 lg:p-8">
    <UiCardHeader class="text-center">
      <div class="mb-4 flex justify-center">
        <UiHoverCard>
          <UiHoverCardTrigger as-child>
            <UiAvatar class="h-20 w-20 sm:h-24 sm:w-24 cursor-pointer">
              <UiAvatarFallback class="text-xl sm:text-2xl">TH</UiAvatarFallback>
            </UiAvatar>
          </UiHoverCardTrigger>
          <UiHoverCardContent class="w-80 p-0">
            <div class="space-y-0">
              <UiAspectRatio :ratio="4 / 5" class="overflow-hidden rounded-t-md">
                <NuxtImg
                  src="/IMG_6637.jpg"
                  alt="Behind Soft Spoken Studios"
                  class="h-full w-full object-cover"
                  width="320"
                  height="400"
                />
              </UiAspectRatio>
              <div class="p-4 text-left">
                <h4 class="font-semibold">Behind Soft Spoken Studios</h4>
                <p class="text-muted-foreground mt-2 text-sm">
                  Thoughtful communication over loud marketing. Quality over noise.
                </p>
              </div>
            </div>
          </UiHoverCardContent>
        </UiHoverCard>
      </div>
      <UiCardTitle class="mb-2 text-2xl sm:text-3xl line-clamp-3">About Soft Spoken</UiCardTitle>
    </UiCardHeader>
    <UiCardContent class="text-center">
      <div class="mb-6 flex flex-wrap gap-2 justify-center">
        <UiBadge variant="outline" class="justify-center">English</UiBadge>
        <UiBadge variant="outline" class="justify-center">Swedish</UiBadge>
        <UiBadge variant="outline" class="justify-center">Dutch</UiBadge>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup>
</script>
