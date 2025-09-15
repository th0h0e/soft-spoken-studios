<template>
    <UiContainer class="py-16 lg:py-24">
      <UiDivider />
      <div class="mt-8">
        <slot name="headline">
        <p class="font-semibold text-primary">{{ headline }}</p>
      </slot>
      <slot name="title">
        <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">{{ title }}</h2>
      </slot>
      <slot name="description">
        <p class="max-w-[800px] text-lg text-muted-foreground lg:text-xl">
          {{ description }}
        </p>
      </slot>
        <div class="mt-5 flex w-full flex-col-reverse gap-3 lg:w-auto lg:flex-row">
          <slot>
            <!-- Default buttons if no slot content provided -->
            <div class="flex flex-col gap-3 sm:flex-row">
              <UiButton size="sm" variant="outline" as-child>
                <NuxtLink to="/work">View Our Work</NuxtLink>
              </UiButton>
              
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
          </slot>
        </div>
      </div>
    </UiContainer>
  </template>
  
  <script lang="ts" setup>
    withDefaults(
      defineProps<{
        headline?: string;
        description?: string;
        title?: string;
      }>(),
      {
        headline: "About us",
        description:
          "Learn more about our creative agency from the inside out. We take pride in offering the best services to our clients and partners.",
        title: "We are a creative agency",
      }
    );

    // Use contact form composable
    const {
      contactForm,
      isSubmitting,
      submitMessage,
      submitSuccess,
      submitContactForm
    } = useContactForm()
  </script>
  