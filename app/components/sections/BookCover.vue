<template>
  <div>
    <div class="py-16">
      <!-- Author Name -->
      <h1 class="mb-16 text-4xl font-normal">Thomas G. Hibbert</h1>

      <!-- Main Title -->
      <div class="mb-12">
        <h2 class="mb-4 text-6xl leading-tight font-semibold">
          The<br />
          Soft -<br />
          Spoken
        </h2>
        <p class="text-3xl font-normal italic">A Studio for Communication Strategy</p>
      </div>
    </div>

    <!-- Black divider line -->
    <div class="bg-foreground mb-12 h-2 w-full"></div>

    <div class="pb-16">
      <!-- Subtitle -->
      <div class="space-y-2 text-left">
        <p class="text-lg font-normal">From the TRANSCRIPT TO</p>
        <p class="text-lg font-normal tracking-wider">THE LOGIC OF PRESENCE & DISCOVERY</p>
      </div>

      <!-- Editor -->
      <p class="mt-8 text-left text-lg font-normal">Edited by W. W. Bartley, III</p>
    </div>
  </div>
</template>

<script setup>
  // Props for making it reusable
  const props = defineProps({
    author: {
      type: String,
      default: "Karl R. Popper",
    },
    title: {
      type: Array,
      default: () => ["The", "Open", "Universe"],
    },
    subtitle: {
      type: String,
      default: "An Argument for Indeterminism",
    },
    postscriptFrom: {
      type: Array,
      default: () => ["From the POSTSCRIPT TO", "THE LOGIC OF SCIENTIFIC DISCOVERY"],
    },
    editor: {
      type: String,
      default: "Edited by W. W. Bartley, III",
    },
  });
</script>
