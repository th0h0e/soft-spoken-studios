<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <!-- Video Production Card -->
    <UiDrawer>
      <Motion
        initial="initial"
        in-view="animate"
        :variants="{
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              when: 'beforeChildren',
              delayChildren: stagger(0.12),
            },
          },
        }"
      >
        <UiDrawerTrigger as-child>
          <div
            class="group relative cursor-pointer overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl"
          >
            <Motion
              as-child
              :variants="{
                initial: { opacity: 0, scale: 1.1 },
                animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
              }"
              class="block"
            >
              <div class="relative block overflow-hidden">
                <img
                  src="/images/0cb12b5fba26e02dec8f0ab5f325c334.jpg"
                  alt="Video Production"
                  class="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </Motion>

            <div class="p-6">
              <Motion
                v-if="headline"
                as-child
                :variants="{
                  initial: { opacity: 0, scale: 0 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  },
                }"
              >
                <UiBadge variant="secondary" class="text-xs">
                  {{ headline }}
                </UiBadge>
              </Motion>

              <Motion as-child :variants="childVariant">
                <h3 class="mb-3 mt-3 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
                  Video Production
                </h3>
              </Motion>

              <Motion
                as="p"
                :variants="childVariant"
                class="mb-5 text-muted-foreground leading-relaxed"
              >
                Stories that move. We create videos that capture authentic moments and communicate your message with clarity and impact.
              </Motion>

              <Motion :variants="childVariant" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon name="feather:play" class="size-5 text-muted-foreground" />
                  <span class="text-xs text-muted-foreground">Creative Visual Storytelling</span>
                </div>
                <Icon
                  name="feather:arrow-right"
                  class="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </Motion>
            </div>
          </div>
        </UiDrawerTrigger>
      </Motion>

      <UiDrawerContent class="px-4 pb-6 md:!px-0">
        <div class="grid gap-4 lg:grid-cols-12">
          <!-- Empty column for sidebar (2/12) -->
          <div class="hidden lg:block lg:col-span-2"></div>

          <!-- Center Column - Service Info (7/12) -->
          <div class="lg:col-span-7">
            <div class="space-y-4">
              <div>
                <h4 class="mb-2 font-medium">Video Production Service</h4>
                <p class="text-sm text-muted-foreground mb-4">
                  Tell us about your video project. What story do you want to tell? What are your goals and vision?
                </p>
                <UiTextarea
                  v-model="videoMessage"
                  placeholder="Describe your video project, target audience, style preferences, and any other details that will help us understand your vision..."
                  class="min-h-[320px] w-full"
                  required
                />
              </div>
            </div>

            <UiDrawerFooter class="px-0 pt-4">
              <div class="flex gap-3">
                <UiButton
                  class="flex-1"
                  @click="submitServiceRequest('video')"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Sending...' : 'Send Request' }}
                </UiButton>
                <UiDrawerClose as-child>
                  <UiButton variant="outline" class="flex-1">Close</UiButton>
                </UiDrawerClose>
              </div>
            </UiDrawerFooter>
          </div>

          <!-- Right Column - Contact Info (3/12) -->
          <div class="lg:col-span-3">
            <h4 class="mb-2 font-medium">Contact Information</h4>
            <p class="text-muted-foreground mb-1 text-sm">
              Email: {{ settings?.contact?.email || 'info@softspokenstudios.com' }}
            </p>
            <p class="text-muted-foreground text-sm">
              Phone: {{ settings?.contact?.phone || '+31 6 1234 5678' }}
            </p>
          </div>
        </div>
      </UiDrawerContent>
    </UiDrawer>

    <!-- Copywriting Card -->
    <UiDrawer>
      <Motion
        initial="initial"
        in-view="animate"
        :variants="{
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              when: 'beforeChildren',
              delayChildren: stagger(0.12),
            },
          },
        }"
      >
        <UiDrawerTrigger as-child>
          <div
            class="group relative cursor-pointer overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl"
          >
            <Motion
              as-child
              :variants="{
                initial: { opacity: 0, scale: 1.1 },
                animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
              }"
              class="block"
            >
              <div class="relative block overflow-hidden">
                <img
                  src="/images/3334f4a0741954580a818e303927dfcd.jpg"
                  alt="Copywriting"
                  class="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </Motion>

            <div class="p-6">
              <Motion
                as-child
                :variants="{
                  initial: { opacity: 0, scale: 0 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  },
                }"
              >
                <UiBadge variant="secondary" class="text-xs">
                  Writing
                </UiBadge>
              </Motion>

              <Motion as-child :variants="childVariant">
                <h3 class="mb-3 mt-3 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
                  Copywriting
                </h3>
              </Motion>

              <Motion
                as="p"
                :variants="childVariant"
                class="mb-5 text-muted-foreground leading-relaxed"
              >
                Words that matter. We craft copy that speaks directly to your audience without unnecessary noise. Every word is chosen with purpose.
              </Motion>

              <Motion :variants="childVariant" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon name="feather:pen-tool" class="size-5 text-muted-foreground" />
                  <span class="text-xs text-muted-foreground">Purposeful Communication</span>
                </div>
                <Icon
                  name="feather:arrow-right"
                  class="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </Motion>
            </div>
          </div>
        </UiDrawerTrigger>
      </Motion>

      <UiDrawerContent class="px-4 pb-6 md:!px-0">
        <div class="grid gap-4 lg:grid-cols-12">
          <!-- Empty column for sidebar (2/12) -->
          <div class="hidden lg:block lg:col-span-2"></div>

          <!-- Center Column - Service Info (7/12) -->
          <div class="lg:col-span-7">
            <div class="space-y-4">
              <div>
                <h4 class="mb-2 font-medium">Copywriting Service</h4>
                <p class="text-sm text-muted-foreground mb-4">
                  Tell us about your copywriting needs. What message do you want to convey? Who is your audience?
                </p>
                <UiTextarea
                  v-model="copyMessage"
                  placeholder="Describe your copywriting project, target audience, tone, style, and any other details that will help us craft the perfect message..."
                  class="min-h-[320px] w-full"
                  required
                />
              </div>
            </div>

            <UiDrawerFooter class="px-0 pt-4">
              <div class="flex gap-3">
                <UiButton
                  class="flex-1"
                  @click="submitServiceRequest('copywriting')"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Sending...' : 'Send Request' }}
                </UiButton>
                <UiDrawerClose as-child>
                  <UiButton variant="outline" class="flex-1">Close</UiButton>
                </UiDrawerClose>
              </div>
            </UiDrawerFooter>
          </div>

          <!-- Right Column - Contact Info (3/12) -->
          <div class="lg:col-span-3">
            <h4 class="mb-2 font-medium">Contact Information</h4>
            <p class="text-muted-foreground mb-1 text-sm">
              Email: {{ settings?.contact?.email || 'info@softspokenstudios.com' }}
            </p>
            <p class="text-muted-foreground text-sm">
              Phone: {{ settings?.contact?.phone || '+31 6 1234 5678' }}
            </p>
          </div>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
import { stagger } from "motion-v";
import type { MotionProps } from "motion-v";

const childVariant: MotionProps["variants"] = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headline = "Service";

// State for service requests
const videoMessage = ref("");
const copyMessage = ref("");
const isSubmitting = ref(false);

// Fetch settings from Nuxt Content
const { data: settings } = await useAsyncData(
  'services-settings',
  () => queryCollection('settings').first()
);

// Submit service request
const submitServiceRequest = async (serviceType: string) => {
  isSubmitting.value = true;
  const message = serviceType === 'video' ? videoMessage.value : copyMessage.value;

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        message,
        serviceType,
      },
    });

    // Clear message after successful submission
    if (serviceType === 'video') {
      videoMessage.value = '';
    } else {
      copyMessage.value = '';
    }
  } catch (error) {
    console.error('Error submitting service request:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
