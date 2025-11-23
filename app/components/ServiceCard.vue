<template>
  <Motion
    initial="initial"
    in-view="animate"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.12)
        }
      }
    }"
  >
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <UCard
        v-for="card in cards"
        :key="card.title"
        variant="outline"
        class="group cursor-pointer overflow-hidden"
        :ui="{ header: '!p-0', body: 'p-6', footer: 'p-6' }"
      >
        <template #header>
          <Motion
            as-child
            :variants="{
              initial: { opacity: 0, scale: 1.1 },
              animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
            }"
            class="block"
          >
            <div class="relative block overflow-hidden">
              <NuxtImg
                :src="card.image"
                :alt="card.imageAlt || card.title"
                class="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                width="800"
                height="280"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-default/80 via-default/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </Motion>
        </template>

        <template #default>
          <Motion
            v-if="card.badge"
            as-child
            :variants="{
              initial: { opacity: 0, scale: 0 },
              animate: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }
            }"
          >
            <UBadge
              color="neutral"
              variant="subtle"
              class="text-xs"
            >
              {{ card.badge }}
            </UBadge>
          </Motion>

          <Motion
            as-child
            :variants="childVariant"
          >
            <h3 class="mb-3 mt-3 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
              {{ card.title }}
            </h3>
          </Motion>

          <Motion
            as="div"
            :variants="childVariant"
            class="text-muted leading-relaxed"
          >
            {{ card.description }}
          </Motion>
        </template>

        <template #footer>
          <Motion
            :variants="childVariant"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <UIcon
                :name="card.icon || 'feather:arrow-right'"
                class="size-5 text-muted"
              />
              <span class="text-xs text-muted">{{ card.iconLabel || 'Learn more' }}</span>
            </div>
            <UIcon
              name="feather:arrow-right"
              class="size-5 text-muted transition-transform group-hover:translate-x-1"
            />
          </Motion>
        </template>
      </UCard>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { stagger } from 'motion-v'
import type { MotionProps } from 'motion-v'

/**
   * MDC Component for Nuxt Studio - Service Cards
   *
   * Usage in markdown:
   * ::service-cards
   * ---
   * cards:
   *   - image: /path/to/image1.jpg
   *     imageAlt: Video production
   *     badge: Service
   *     title: Video Production
   *     icon: feather:play
   *     iconLabel: Creative Storytelling
   *     description: Stories that move. We create videos that capture authentic moments and communicate your message.
   *   - image: /path/to/image2.jpg
   *     badge: Writing
   *     title: Copywriting
   *     icon: feather:pen-tool
   *     iconLabel: Purposeful Communication
   *     description: Words with purpose. Clear, compelling copy that connects with your audience.
   * ::
   */

const childVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

interface ServiceCard {
  image: string
  imageAlt?: string
  badge?: string
  title: string
  icon?: string
  iconLabel?: string
  description: string
}

withDefaults(
  defineProps<{
    cards: ServiceCard[]
  }>(),
  {}
)
</script>
