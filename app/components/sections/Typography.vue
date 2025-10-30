<template>
  <div class="space-y-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />

    <!-- Headings -->
    <div>
      <h3 class="mb-4 mt-6 text-2xl font-semibold">Headings</h3>
      <div class="space-y-4">
        <h1 class="mb-6 mt-8 text-[7rem] font-normal leading-tight">Heading 1</h1>
        <h2 class="mb-5 mt-8 text-6xl font-normal leading-tight">Heading 2</h2>
        <h3 class="mb-4 mt-6 text-[2rem] font-semibold leading-snug">Heading 3</h3>
      </div>
    </div>

    <!-- Paragraph -->
    <div>
      <h3 class="mb-4 mt-6 text-2xl font-semibold">Paragraph</h3>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-muted-foreground mb-1">P1</p>
          <p class="mb-4 text-lg leading-normal">This is a paragraph with standard text styling and line height for readability. The quick brown fox jumps over the lazy dog. It demonstrates how text wraps and flows across multiple lines while maintaining consistent spacing and visual hierarchy.</p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground mb-1">P2</p>
          <p class="mb-4 text-base leading-normal text-muted-foreground">This is a lighter paragraph with muted text color for secondary or supporting content. It uses a subdued tone to indicate that this text is supplementary or less prominent than the primary paragraph. This style works well for captions, descriptions, and additional context.</p>
        </div>
      </div>
    </div>

    <!-- Emphasis & Strong -->
    <div>
      <h3 class="mb-4 mt-6 text-2xl font-semibold">Text Styling</h3>
      <div class="space-y-2">
        <p class="mb-4 leading-relaxed"><em class="italic">Emphasized text</em> is typically displayed in italics.</p>
        <p class="mb-4 leading-relaxed"><strong class="font-bold">Strong text</strong> is typically displayed in bold.</p>
      </div>
    </div>

    <!-- Links -->
    <div>
      <h3 class="mb-4 mt-6 text-2xl font-semibold">Links</h3>
      <p class="mb-4 leading-relaxed">
        <a href="/" class="underline underline-offset-2 hover:opacity-70 transition-opacity">This is a link</a> styled for navigation.
      </p>
    </div>

    <!-- Blockquote -->
    <div>
      <h3 class="mb-4 mt-6 text-2xl font-semibold">Blockquote</h3>
      <blockquote class="my-6 border-l-4 border-neutral-300 pl-4 italic dark:border-neutral-700">This is a blockquote used to highlight important quotes or statements.</blockquote>
    </div>
  </div>
</template>

<script setup lang="ts">
// Typography showcase component
</script>
