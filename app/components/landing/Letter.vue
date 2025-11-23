<script setup lang="ts">
/**
 * Letter Component for Nuxt Studio
 *
 * Displays a formatted letter with header, title, subtitle, and paragraphs.
 *
 * Can be used in two ways:
 * 1. With page object: <LandingLetter :page="page" /> (uses page.headerText, page.title, etc.)
 * 2. With direct props: <LandingLetter headerText="..." title="..." subtitle="..." :paragraphs="[...]" />
 */

const props = withDefaults(
  defineProps<{
    page?: {
      headerText?: string
      title?: string
      subtitle?: string
      paragraphs?: Array<{ text: string, italic: boolean }>
    }
    headerText?: string
    title?: string
    subtitle?: string
    paragraphs?: Array<{ text: string, italic: boolean }>
  }>(),
  {
    headerText: 'Intent, SSS Ink.',
    title: 'SIGNAL TO\nNOISE RATIOS',
    subtitle: 'Thomas Hibbert & Sons',
    paragraphs: () => [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl metus, accumsan id eros id, vehicula tincidunt nisl. Nulla sit amet urna ut mi tempor euismod. Fusce elementum sapien eget elit sodales fringilla. Pellentesque et nulla vel velit malesuada fermentum vitae vitae justo. Nulla dignissim volutpat interdum. Pellentesque at molestie tortor. Proin magna ante, fermentum ac elementum at, lacinia et arcu.',
        italic: false
      },
      {
        text: 'Ut volutpat pharetra orci, ac bibendum nunc vulputate in. Praesent porttitor venenatis lacus sed mollis. Nulla varius leo nec porta tempus. Nunc orci enim, bibendum in gravida eu, pretium eu purus. Sed vestibulum quam',
        italic: true
      },
      {
        text: 'Ut volutpat pharetra orci, ac bibendum nunc vulputate in. Praesent porttitor venenatis lacus sed mollis. Nulla varius leo nec porta tempus. Nunc orci enim, bibendum in gravida eu, pretium eu purus. Sed vestibulum quam',
        italic: true
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl metus, accumsan id eros id, vehicula tincidunt nisl. Nulla sit amet urna ut mi tempor euismod. Fusce elementum sapien eget elit sodales fringilla. Pellentesque et nulla vel velit malesuada fermentum vitae vitae justo. Nulla dignissim volutpat interdum. Pellentesque at molestie tortor. Proin magna ante, fermentum ac elementum at, lacinia et arcu.',
        italic: false
      }
    ]
  }
)

// Support both page.* (from letter collection) and direct props
const letterHeaderText = computed(() => props.page?.headerText || props.headerText)
const letterTitle = computed(() => props.page?.title || props.title)
const letterSubtitle = computed(() => props.page?.subtitle || props.subtitle)
const letterParagraphs = computed(() => props.page?.paragraphs || props.paragraphs)
</script>

<template>
  <UPageSection>
    <UCard
      v-if="letterHeaderText || letterTitle"
      class="shadow-md"
      :ui="{ body: 'bg-elevated/30 !px-6 sm:!px-12 lg:!px-28 !pt-20 !pb-48' }"
    >
      <!-- Header text -->
      <p class="text-muted mb-8 text-left text-lg">
        {{ letterHeaderText }}
      </p>

      <!-- Main title -->
      <h1
        class="text-foreground mb-6 text-left text-4xl font-bold tracking-wider whitespace-pre-line"
      >
        {{ letterTitle }}
      </h1>

      <!-- Subtitle -->
      <p class="text-muted mb-16 text-left text-xl">
        {{ letterSubtitle }}
      </p>

      <!-- Body text -->
      <div class="text-foreground space-y-4 leading-relaxed">
        <p
          v-for="(paragraph, index) in letterParagraphs"
          :key="index"
          :class="['text-justify', paragraph.italic && 'pl-8 italic']"
        >
          {{ paragraph.text }}
        </p>
      </div>
    </UCard>
  </UPageSection>
</template>
