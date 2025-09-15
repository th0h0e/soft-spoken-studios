<template>
  <UiContainer class="max-w-4xl">
    <div class="pr-8 py-16">
      <!-- Author Name -->
      <h1 class="text-4xl font-normal mb-16">Thomas G. Hibbert</h1>
      
      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="text-6xl font-semibold leading-tight mb-4">
          The<br>
          Soft -<br>
          Spoken
        </h2>
        <p class="text-3xl italic font-normal">A Studio for Communication Strategy</p>
      </div>
      
      <!-- Black divider line -->
      <div class="w-full h-2 bg-foreground mb-12 mr-[-2rem]"></div>
      
      <!-- Subtitle -->
      <div class="space-y-2 text-left">
        <p class="text-lg font-normal">From the TRANSCRIPT TO</p>
        <p class="text-lg font-normal tracking-wider">THE LOGIC OF PRESENCE & DISCOVERY</p>
      </div>
      
      <!-- Editor -->
      <p class="text-lg font-normal mt-8 text-left">Edited by W. W. Bartley, III</p>
    </div>
  </UiContainer>
</template>

<script setup>
// Props for making it reusable
const props = defineProps({
  author: {
    type: String,
    default: 'Karl R. Popper'
  },
  title: {
    type: Array,
    default: () => ['The', 'Open', 'Universe']
  },
  subtitle: {
    type: String,
    default: 'An Argument for Indeterminism'
  },
  postscriptFrom: {
    type: Array,
    default: () => ['From the POSTSCRIPT TO', 'THE LOGIC OF SCIENTIFIC DISCOVERY']
  },
  editor: {
    type: String,
    default: 'Edited by W. W. Bartley, III'
  }
});
</script>