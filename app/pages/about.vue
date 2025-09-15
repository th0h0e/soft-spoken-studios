<template>
  <UiContainer>
    <div class="grid lg:grid-cols-8 gap-8 items-start">
      <!-- Left Column - About Me Card -->
      <div class="lg:col-span-2 lg:sticky lg:top-8">
        <UiCard class="p-8">
          <UiCardHeader class="text-center">
            <div class="flex justify-center mb-4">
              <UiHoverCard>
                <UiHoverCardTrigger as-child>
                  <UiAvatar class="w-24 h-24 cursor-pointer">
                    <UiAvatarFallback class="text-2xl">TH</UiAvatarFallback>
                  </UiAvatar>
                </UiHoverCardTrigger>
                <UiHoverCardContent class="w-80 p-0">
                  <div class="space-y-0">
                  <UiAspectRatio :ratio="4/5" class="overflow-hidden rounded-t-md">
                      <NuxtImg
                        src="/IMG_6637.jpg"
                        alt="Behind Soft Spoken Studios"
                        class="w-full h-full object-cover"
                        width="320"
                        height="400"
                      />
                  </UiAspectRatio>
                    <div class="p-4 text-left">
                      <h4 class="font-semibold">Behind Soft Spoken Studios</h4>
                      <p class="text-sm text-muted-foreground mt-2">
                        Thoughtful communication over loud marketing. Quality over noise.
                      </p>
                    </div>
                  </div>
                </UiHoverCardContent>
              </UiHoverCard>
            </div>
            <UiCardTitle class="text-3xl mb-2">{{ $t('about.title') }}</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="text-center">
          
            <div class="flex gap-2 mb-6">
              <UiBadge variant="outline" class="flex-1 justify-center min-w-12">English</UiBadge>
              <UiBadge variant="outline" class="flex-1 justify-center min-w-12">Swedish</UiBadge>
              <UiBadge variant="outline" class="flex-1 justify-center min-w-12">Dutch</UiBadge>
            </div>

            <div class="flex gap-3">
              <UiButton size="sm" variant="outline" class="flex-1" as-child>
                <NuxtLink :to="localePath('/work')">Our Work</NuxtLink>
              </UiButton>

              <UiDrawer>
                <UiDrawerTrigger as-child>
                  <UiButton size="sm" class="flex-1">Get In Touch</UiButton>
                </UiDrawerTrigger>
                
                <UiDrawerContent class="px-6 pb-6">
                  <div class="grid lg:grid-cols-[16rem_1fr] gap-0 p-4">
                    <!-- Sidebar Spacer Column -->
                    <div class="lg:block hidden">
                      <!-- Empty spacer to match sidebar width -->
                    </div>
                    
                    <!-- Content Area -->
                    <div class="grid lg:grid-cols-8 gap-8">
                      <!-- Left Column -->
                      <div class="lg:col-span-5">
                        <div class="space-y-4 p-4">
                          <div>
                            <h4 class="font-medium mb-2">Send me a message</h4>
                            <UiTextarea 
                              placeholder="Tell us about your project and how we can help..."
                              class="w-full min-h-[280px]"
                            />
                          </div>
                        </div>
                        
                        <UiDrawerFooter class="p-4">
                          <div class="flex gap-3">
                            <UiButton class="flex-1">Send</UiButton>
                            <UiDrawerClose as-child>
                              <UiButton variant="outline" class="flex-1">Close</UiButton>
                            </UiDrawerClose>
                          </div>
                        </UiDrawerFooter>
                      </div>
                      
                      <!-- Right Column -->
                      <div class="lg:col-span-3">
                        <div class="p-4">
                          <div>
                            <h4 class="font-medium mb-2">Contact Information</h4>
                            <p class="text-muted-foreground text-sm mb-1">Email: hello@softspokenstudios.com</p>
                            <p class="text-muted-foreground text-sm">Phone: +31 6 1234 5678</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </UiDrawerContent>
              </UiDrawer>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Right Column - Header and Content -->
      <div class="lg:col-span-6 space-y-12 bg-muted p-12">
        <Letter />

        <UiDivider />

        <!-- Skills & Expertise -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="text-2xl font-semibold mb-6">Skills & Expertise</h2>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium mb-3">Creative Skills</h4>
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
                <h4 class="font-medium mb-3">Technical Skills</h4>
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
            <h2 class="text-2xl font-semibold mb-6">Engagements & Experience</h2>
            <UiTimeline v-model="currentStep" class="w-full">
            <UiTimelineItem :step="1">
              <UiTimelineIndicator />
              <UiTimelineContent>
                <UiTimelineHeader>
                  <UiTimelineTitle>Director SSS</UiTimelineTitle>
                  <UiTimelineDate>2023 - Present</UiTimelineDate>
                </UiTimelineHeader>
                <div class="mt-2">
                  <p class="text-sm text-muted-foreground mb-3">
                    Leading creative strategy and execution for diverse clients across industries. 
                    Specializing in integrated campaigns that combine compelling copy with visual storytelling.
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
                  <p class="text-sm text-muted-foreground mb-3">
                    Developed copy strategies for major brand campaigns, increasing client engagement 
                    by an average of 40%. Collaborated with design and strategy teams.
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
                  <p class="text-sm text-muted-foreground mb-3">
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
            <h2 class="text-2xl font-semibold mb-6">Focus & Philosophy</h2>
            <div class="space-y-4">
            <p class="text-muted-foreground">
              I believe that great creative work comes from understanding people and their stories. 
              My approach combines strategic thinking with genuine curiosity about human behavior 
              and cultural trends.
            </p>
            
            <UiDivider />
            
            <div>
              <h4 class="font-medium mb-3">Industry Focus</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex flex-wrap gap-2">
                  <UiBadge variant="outline">Fashion Photography & Film</UiBadge>
                  <UiBadge variant="outline">Documentary Production</UiBadge>
                  <UiBadge variant="outline">Set Design</UiBadge>
                  <UiBadge variant="outline">Urban Exploration</UiBadge>
                </div>
                <div class="flex flex-wrap gap-2">
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-4 bg-muted rounded-lg">
              <p class="text-sm italic">
                "Creativity is intelligence having fun, but strategy is creativity having purpose."
              </p>
            </div>
          </div>
          </UiCardContent>
        </UiCard>

        <UiDivider />

        <!-- Educational Journey -->
        <UiCard>
          <UiCardContent class="py-4">
            <h2 class="text-2xl font-semibold mb-6">Educational Journey</h2>
            <Education />
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
const currentStep = ref(1);
</script>