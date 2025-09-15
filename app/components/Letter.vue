<template>
  <div class="bg-muted p-12">
    <UiCard class="max-w-2xl mx-auto shadow-lg p-16">
      <!-- Header text -->
      <p class="text-left text-muted-foreground text-lg mb-8">{{ headerText }}</p>
      
      <!-- Main title -->
      <h1 class="text-left text-4xl font-bold tracking-wider text-foreground mb-6 whitespace-pre-line">{{ title }}</h1>
      
      <!-- Subtitle -->
      <p class="text-left text-muted-foreground text-xl mb-16">{{ subtitle }}</p>
      
      <!-- Body text -->
      <div class="text-foreground leading-relaxed space-y-4">
        <p v-for="(paragraph, index) in paragraphs" 
           :key="index"
           :class="[
             'text-justify',
             paragraph.italic && 'italic pl-8'
           ]">
          {{ paragraph.text }}
        </p>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
// Props for making it reusable
const props = defineProps({
  headerText: {
    type: String,
    default: 'Intent, SSS Ink.'
  },
  title: {
    type: String,
    default: 'SIGNAL TO\nNOISE RATIOS'
  },
  subtitle: {
    type: String,
    default: 'Proin Magna'
  },
  paragraphs: {
    type: Array,
    default: () => [
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
});
</script>