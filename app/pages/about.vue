<template>
  <UiContainer>
    <div class="grid items-start gap-8 lg:grid-cols-8">
      <!-- Left Column - About Me Card -->
      <div class="lg:sticky lg:top-8 lg:col-span-2">
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
      </div>

      <!-- Right Column - Header and Content -->
      <div class="bg-muted space-y-12 p-12 lg:col-span-6">
        <Letter />

        <UiDivider />

        <!-- Skills & Expertise -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="mb-6 text-2xl font-semibold">Skills & Expertise</h2>
            <div class="space-y-6">
              <div>
                <h4 class="mb-3 font-medium">Creative Skills</h4>
                <div class="flex flex-wrap gap-2">
                  <UiBadge>Copywriting</UiBadge>
                  <UiBadge>Creative Strategy</UiBadge>
                  <UiBadge>Brand Messaging</UiBadge>
                  <UiBadge>Content Strategy</UiBadge>
                  <UiBadge>Campaign Development</UiBadge>
                  <UiBadge>Storytelling</UiBadge>
                </div>
              </div>

              <UiDivider />

              <div>
                <h4 class="mb-3 font-medium">Technical Skills</h4>
                <div class="flex flex-wrap gap-2">
                  <UiBadge variant="outline">Adobe Creative Suite</UiBadge>
                  <UiBadge variant="outline">Final Cut Pro</UiBadge>
                  <UiBadge variant="outline">Figma</UiBadge>
                  <UiBadge variant="outline">WordPress</UiBadge>
                  <UiBadge variant="outline">Google Analytics</UiBadge>
                  <UiBadge variant="outline">Social Media Platforms</UiBadge>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiDivider />

        <!-- Professional Journey -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="mb-6 text-2xl font-semibold">Engagements & Experience</h2>
            <UiTimeline v-model="currentStep" class="w-full">
              <UiTimelineItem :step="1">
                <UiTimelineIndicator />
                <UiTimelineContent>
                  <UiTimelineHeader>
                    <UiTimelineTitle>Director SSS</UiTimelineTitle>
                    <UiTimelineDate>2023 - Present</UiTimelineDate>
                  </UiTimelineHeader>
                  <div class="mt-2">
                    <p class="text-muted-foreground mb-3 text-sm">
                      Leading creative strategy and execution for diverse clients across industries.
                      Specializing in integrated campaigns that combine compelling copy with visual
                      storytelling.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <UiBadge variant="secondary" size="sm">Team Leadership</UiBadge>
                      <UiBadge variant="secondary" size="sm">Client Relations</UiBadge>
                      <UiBadge variant="secondary" size="sm">Project Management</UiBadge>
                    </div>
                  </div>
                </UiTimelineContent>
                <UiTimelineSeparator />
              </UiTimelineItem>

              <UiTimelineItem :step="2">
                <UiTimelineIndicator />
                <UiTimelineContent>
                  <UiTimelineHeader>
                    <UiTimelineTitle>Senior Copywriter</UiTimelineTitle>
                    <UiTimelineDate>2021 - 2023</UiTimelineDate>
                  </UiTimelineHeader>
                  <div class="mt-2">
                    <p class="text-muted-foreground mb-3 text-sm">
                      Developed copy strategies for major brand campaigns, increasing client
                      engagement by an average of 40%. Collaborated with design and strategy teams.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <UiBadge variant="secondary" size="sm">Campaign Copy</UiBadge>
                      <UiBadge variant="secondary" size="sm">Brand Voice</UiBadge>
                      <UiBadge variant="secondary" size="sm">Content Strategy</UiBadge>
                    </div>
                  </div>
                </UiTimelineContent>
                <UiTimelineSeparator />
              </UiTimelineItem>

              <UiTimelineItem :step="3">
                <UiTimelineIndicator />
                <UiTimelineContent>
                  <UiTimelineHeader>
                    <UiTimelineTitle>Comunication Strategist at Tenue de Nimes</UiTimelineTitle>
                    <UiTimelineDate>2020 - 2021</UiTimelineDate>
                  </UiTimelineHeader>
                  <div class="mt-2">
                    <p class="text-muted-foreground mb-3 text-sm">
                      Built content frameworks for emerging brands, focusing on authentic
                      storytelling and audience engagement across digital platforms.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <UiBadge variant="secondary" size="sm">Social Media</UiBadge>
                      <UiBadge variant="secondary" size="sm">Content Planning</UiBadge>
                      <UiBadge variant="secondary" size="sm">Analytics</UiBadge>
                    </div>
                  </div>
                </UiTimelineContent>
              </UiTimelineItem>
            </UiTimeline>
          </UiCardContent>
        </UiCard>

        <UiDivider />

        <!-- Interests & Philosophy -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="mb-6 text-2xl font-semibold">Focus & Philosophy</h2>
            <div class="space-y-4">
              <p class="text-muted-foreground">
                I believe that great creative work comes from understanding people and their
                stories. My approach combines strategic thinking with genuine curiosity about human
                behavior and cultural trends.
              </p>

              <UiDivider />

              <div>
                <h4 class="mb-3 font-medium">Industry Focus</h4>
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="flex flex-wrap gap-2">
                    <UiBadge variant="outline">Fashion Photography & Film</UiBadge>
                    <UiBadge variant="outline">Documentary Production</UiBadge>
                    <UiBadge variant="outline">Set Design</UiBadge>
                    <UiBadge variant="outline">Urban Exploration</UiBadge>
                  </div>
                  <div class="flex flex-wrap gap-2"></div>
                </div>
              </div>

              <div class="bg-muted mt-4 rounded-lg p-4">
                <p class="text-sm italic">
                  "Creativity is intelligence having fun, but strategy is creativity having
                  purpose."
                </p>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiDivider />

        <!-- Educational Journey -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="mb-6 text-2xl font-semibold">Educational Journey</h2>
            <Education />
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script setup>
  const currentStep = ref(1);
</script>
