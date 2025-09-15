<template>
    <UiContainer class="py-10 lg:py-16">
      <div class="flex h-full items-center">
        <div class="pt-8 lg:pt-40">
          <h1 class="mb-4 text-4xl font-bold md:text-5xl lg:mb-6 xl:text-6xl">
            Money talks. We Translate
          </h1>
          <p class="max-w-[560px] text-lg text-muted-foreground lg:text-xl">
            A creative communication agency specializing in thoughtful copywriting and authentic video production for local businesses and meaningful brands.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
            <UiButton size="sm" variant="outline">View Our Work</UiButton>
            
            <UiDrawer>
              <UiDrawerTrigger as-child>
                <UiButton size="sm">Get In Touch</UiButton>
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

                          <div>
                            <label class="text-sm font-medium">Message</label>
                            <UiTextarea
                              v-model="contactForm.message"
                              placeholder="Tell us about your project and how we can help...

Please include your email or phone number so we can get back to you."
                              class="w-full min-h-[320px]"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <UiDrawerFooter class="p-4">
                        <div class="flex gap-3">
                          <UiButton
                            class="flex-1"
                            @click="submitContactForm"
                            :disabled="isSubmitting"
                          >
                            {{ isSubmitting ? 'Sending...' : 'Send' }}
                          </UiButton>
                          <UiDrawerClose as-child>
                            <UiButton variant="outline" class="flex-1">Close</UiButton>
                          </UiDrawerClose>
                        </div>

                        <div v-if="submitMessage" class="mt-2 text-sm" :class="submitSuccess ? 'text-green-600' : 'text-red-600'">
                          {{ submitMessage }}
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
          <p class="mt-5 text-sm text-muted-foreground">
            Quality over noise. Thoughtful communication over loud marketing.
          </p>
        </div>
      </div>
    </UiContainer>
  </template>
  
  <script lang="ts" setup>
  // Use contact form composable
  const {
    contactForm,
    isSubmitting,
    submitMessage,
    submitSuccess,
    submitContactForm
  } = useContactForm()
  </script>
  