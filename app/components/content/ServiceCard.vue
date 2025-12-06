/*
 MDC Component for Nuxt Studio - Service Cards

 Usage in markdown:
 ::service-card
 ---
 cards:
   - image: /path/to/image1.jpg
     imageAlt: Video production
     badge: Service
     title: Video Production
     icon: feather:play
     iconLabel: Creative Storytelling
     description: Stories that move. We create videos that capture authentic moments and communicate your message.
     link: /services/video-production
   - image: /path/to/image2.jpg
     badge: Writing
     title: Copywriting
     icon: feather:pen-tool
     iconLabel: Purposeful Communication
     description: Words with purpose. Clear, compelling copy that connects with your audience.
     link: /services/copywriting
 ::
*/

<template>
  <UPageSection>
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
      <div class="flex gap-8">
        <div
          v-for="card in cards"
          :key="card.title"
          class="w-1/2"
        >
          <UCard
            variant="outline"
            class="cursor-pointer overflow-hidden h-full hover-card"
            :ui="{ header: '!p-0 overflow-hidden', body: 'p-6', footer: 'p-6' }"
            @click="card.link && navigateTo(card.link)"
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
                    class="h-[280px] w-full object-cover transition-transform duration-300 card-image"
                    width="800"
                    height="280"
                  />
                  <div
                    class="absolute inset-0 bg-linear-to-t from-default/80 via-default/20 to-transparent opacity-0 transition-opacity duration-300 card-overlay"
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
                  class="size-5 text-muted transition-transform card-arrow"
                />
              </Motion>
            </template>
          </UCard>
        </div>
      </div>
    </Motion>
  </UPageSection>
</template>

<script setup lang="ts">
import { stagger } from 'motion-v'
import type { MotionProps } from 'motion-v'

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
  link?: string
}

defineProps<{
  cards: ServiceCard[]
}>()
</script>

<style scoped>
.hover-card:hover .card-overlay {
  opacity: 1;
}

.hover-card:hover .card-arrow {
  transform: translateX(0.25rem);
}
</style>
