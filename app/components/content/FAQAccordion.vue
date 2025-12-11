<script setup lang="ts">
/**
 * FAQAccordion Component - Accordion UI for FAQ Questions
 *
 * Responsible for rendering the accordion interface for questions
 * within a specific FAQ category.
 */

interface Question {
  label: string
  content: string
}

defineProps<{
  questions: Question[]
}>()
</script>

<template>
  <UAccordion
    trailing-icon="i-feather-plus"
    :items="questions"
    :unmount-on-hide="false"
    :ui="{
      item: 'border-none',
      trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
      trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted'
    }"
  >
    <template #body="{ item }">
      <div class="px-4">
        {{ item.content }}
      </div>
    </template>
  </UAccordion>
</template>
