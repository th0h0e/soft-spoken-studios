<template>
  <div class="group relative cursor-pointer overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl">
    <Motion
      as-child
      :variants="{
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
      }"
      class="block"
    >
      <div class="relative block overflow-hidden">
        <NuxtImg
          :src="image"
          :alt="imageAlt || title"
          class="h-[280px] w-full object-cover"
          width="800"
          height="280"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
        />
      </div>
    </Motion>

    <div class="p-6">
      <Motion
        v-if="badge"
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
          {{ badge }}
        </UiBadge>
      </Motion>

      <Motion as-child :variants="childVariant">
        <h3 class="mb-3 mt-3 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
          {{ title }}
        </h3>
      </Motion>

      <Motion
        as="div"
        :variants="childVariant"
        class="mb-5 text-muted-foreground leading-relaxed"
      >
        <slot />
      </Motion>

      <Motion :variants="childVariant" class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon :name="icon" class="size-5 text-muted-foreground" />
          <span class="text-xs text-muted-foreground">{{ iconLabel }}</span>
        </div>
        <Icon
          name="feather:arrow-right"
          class="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
        />
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { stagger } from "motion-v";
import type { MotionProps } from "motion-v";

/**
 * MDC Component for Nuxt Studio - Service Card
 *
 * Usage in markdown:
 * ::service-card
 * ---
 * image: /path/to/image.jpg
 * imageAlt: Image description
 * badge: Service
 * title: Video Production
 * icon: feather:play
 * iconLabel: Creative Visual Storytelling
 * ---
 * Stories that move. We create videos that capture authentic moments and communicate your message with clarity and impact.
 * ::
 */

const childVariant: MotionProps["variants"] = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

withDefaults(
  defineProps<{
    image: string
    imageAlt?: string
    badge?: string
    title: string
    icon?: string
    iconLabel?: string
  }>(),
  {
    imageAlt: '',
    badge: '',
    icon: 'feather:arrow-right',
    iconLabel: 'Learn more'
  }
)
</script>
