<template>
  <div class="py-16 lg:py-24">
    <UiDivider />
    <div class="mt-8">
      <slot name="headline">
        <p class="text-primary font-semibold">{{ headline }}</p>
      </slot>
      <slot name="title">
        <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">{{ title }}</h2>
      </slot>
      <slot name="description">
        <p class="text-muted-foreground max-w-[800px] text-lg lg:text-xl">
          {{ description }}
        </p>
      </slot>
      <div class="mt-5 flex w-full flex-col-reverse gap-3 lg:w-auto lg:flex-row">
        <slot>
          <!-- Default buttons if no slot content provided -->
          <div class="flex flex-col gap-3 sm:flex-row">
            <UiButton size="sm" variant="outline" as-child>
              <NuxtLink to="/work">{{ appConfig.cta?.viewWork || 'View Our Work' }}</NuxtLink>
            </UiButton>

            <UiDrawer>
              <UiDrawerTrigger as-child>
                <UiButton size="sm">{{ appConfig.cta?.getInTouch || 'Get In Touch' }}</UiButton>
              </UiDrawerTrigger>

              <UiDrawerContent class="px-4 pb-6 md:!px-0">
                <div class="grid gap-4 lg:grid-cols-[16rem_1fr]">
                  <!-- Sidebar Spacer Column -->
                  <div class="hidden lg:block">
                    <!-- Empty spacer to match sidebar width -->
                  </div>

                  <!-- Content Area -->
                  <div class="grid gap-4 lg:grid-cols-8">
                    <!-- Left Column -->
                    <div class="lg:col-span-5">
                      <div class="space-y-4">
                        <div>
                          <h4 class="mb-2 font-medium">Send me a message</h4>

                          <div>
                            <UiTextarea
                              v-model="contactForm.message"
                              placeholder="Tell us about your project and how we can help...
Please include your email or phone number so we can get back to you."
                              class="min-h-[320px] w-full"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <UiDrawerFooter class="px-0 pt-4">
                        <div class="flex gap-3">
                          <UiButton
                            class="flex-1"
                            @click="submitContactForm"
                            :disabled="isSubmitting"
                          >
                            {{ isSubmitting ? (appConfig.cta?.sending || 'Sending...') : (appConfig.cta?.send || 'Send') }}
                          </UiButton>
                          <UiDrawerClose as-child>
                            <UiButton variant="outline" class="flex-1">{{
                              appConfig.cta?.close || 'Close'
                            }}</UiButton>
                          </UiDrawerClose>
                        </div>

                        <div
                          v-if="submitMessage"
                          class="mt-2 text-sm"
                          :class="submitSuccess ? 'text-green-600' : 'text-red-600'"
                        >
                          {{ submitMessage }}
                        </div>
                      </UiDrawerFooter>
                    </div>

                    <!-- Right Column -->
                    <div class="lg:col-span-3">
                      <div>
                        <h4 class="mb-2 font-medium">Contact Information</h4>
                        <p class="text-muted-foreground mb-1 text-sm">
                          Email: {{ settings?.contact?.email || 'info@softspokenstudios.com' }}
                        </p>
                        <p class="text-muted-foreground text-sm">
                          Phone: {{ settings?.contact?.phone || '+31 6 1234 5678' }}
                        </p>
                        <p class="text-muted-foreground text-sm">
                          Location: {{ settings?.contact?.address || 'Amsterdam, Netherlands' }}
                        </p>
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
  </div>
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

  // Access app config for global contact information
  const appConfig = useAppConfig();

  // Fetch settings from Nuxt Content
  const { data: settings } = await useAsyncData(
    'header-settings',
    () => queryCollectionItem('settings', 'settings').first(),
    {
      default: () => null
    }
  );

  // Use contact form composable
  const { contactForm, isSubmitting, submitMessage, submitSuccess, submitContactForm } =
    useContactForm();
</script>
