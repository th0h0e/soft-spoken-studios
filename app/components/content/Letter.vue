<script setup lang="ts">
/*
 MDC Component for Nuxt Studio - Letter

 Usage in markdown:
 ::letter
 ---
 headerText: Intent, SSS Ink.
 title: SIGNAL TO NOISE RATIOS
 subtitle: Thomas Hibbert & Sons
 paragraphs:
   - text: First paragraph...
     italic: false
   - text: Second paragraph...
     italic: true
 ---
 ::
*/

interface Paragraph {
  text: string
  italic: boolean
}

interface LetterData {
  headerText?: string
  title?: string
  subtitle?: string
  paragraphs?: Paragraph[]
}

const props = defineProps<{
  page?: { letter?: LetterData }
  headerText?: string
  title?: string
  subtitle?: string
  paragraphs?: Paragraph[]
}>()

const header = computed(() => props.page?.letter?.headerText || props.headerText)
const title = computed(() => props.page?.letter?.title || props.title)
const subtitle = computed(() => props.page?.letter?.subtitle || props.subtitle)
const paragraphs = computed(() => props.page?.letter?.paragraphs || props.paragraphs)
</script>

<template>
  <UPageSection>
    <UCard
      v-if="header || title"
      class="shadow-md mx-auto w-full sm:max-w-[700px]"
      :ui="{
        root: 'divide-y-0',
        header: 'bg-elevated/30 px-6 sm:px-12 lg:px-18 pt-12 pb-4',
        body: 'bg-elevated/30 px-6 sm:px-12 lg:px-18 py-0',
        footer: 'bg-elevated/30 px-6 sm:px-12 lg:px-18 pt-6 sm:pt-0 pb-20 sm:pb-32'
      }"
    >
      <template #header>
        <p class="text-muted text-base sm:text-md">
          {{ header }}
        </p>
      </template>

      <h1 class="text-3xl sm:text-4xl font-bold tracking-wider whitespace-pre-line mb-2">
        {{ title }}
      </h1>
      <p class="text-muted text-lg sm:text-xl">
        {{ subtitle }}
      </p>

      <template #footer>
        <div class="space-y-6 leading-relaxed">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            :class="['text-sm sm:text-base text-justify', paragraph.italic && 'px-6 italic']"
          >
            {{ paragraph.text }}
          </p>
        </div>
      </template>
    </UCard>
  </UPageSection>
</template>
