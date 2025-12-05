<script setup lang="ts">
/**
 * Letter Component for Nuxt Studio - YAML Method MDC Version
 *
 * Displays a formatted letter with header, title, subtitle, and paragraphs.
 *
 * Can be used in two ways:
 * 1. With YAML method in MDC:
 *    ::letter
 *    ---
 *    headerText: Intent, SSS Ink.
 *    title: SIGNAL TO NOISE RATIOS
 *    subtitle: Thomas Hibbert & Sons
 *    paragraphs:
 *      - text: First paragraph...
 *        italic: false
 *      - text: Second paragraph...
 *        italic: true
 *    ---
 *    ::
 *
 * 2. With page object in Vue: <Letter :page="page" /> (uses page.letter.*)
 */

const props = defineProps<{
  page?: {
    letter?: {
      headerText?: string
      title?: string
      subtitle?: string
      paragraphs?: Array<{ text: string, italic: boolean }>
    }
  }
  headerText?: string
  title?: string
  subtitle?: string
  paragraphs?: Array<{ text: string, italic: boolean }>
}>()

// Support both page.letter.* (from index collection) and direct props
const letterHeaderText = computed(() => props.page?.letter?.headerText || props.headerText)
const letterTitle = computed(() => props.page?.letter?.title || props.title)
const letterSubtitle = computed(() => props.page?.letter?.subtitle || props.subtitle)
const letterParagraphs = computed(() => props.page?.letter?.paragraphs || props.paragraphs)
</script>

<template>
  <UPageSection>
    <UCard
      v-if="letterHeaderText || letterTitle"
      class="shadow-md mx-auto w-full max-w-[700px]"
      :ui="{ body: 'bg-elevated/30 !px-6 sm:!px-12 lg:!px-18 !pb-24' }"
    >
      <!-- Header text -->
      <p class="text-muted mb-8 sm:pt-10 text-left text-lg">
        {{ letterHeaderText }}
      </p>

      <!-- Main title -->
      <h1 class="text-foreground mb-6 text-left text-3xl sm:text-4xl font-bold tracking-wider whitespace-pre-line">
        {{ letterTitle }}
      </h1>

      <!-- Subtitle -->
      <p class="text-muted mb-12 text-left text-xl">
        {{ letterSubtitle }}
      </p>

      <!-- Body text -->
      <div class="text-foreground space-y-2 leading-relaxed">
        <p
          v-for="(paragraph, index) in letterParagraphs"
          :key="index"
          :class="['text-sm sm:text-base text-justify mb-6', paragraph.italic && 'px-6 italic']"
        >
          {{ paragraph.text }}
        </p>
      </div>
    </UCard>
  </UPageSection>
</template>
