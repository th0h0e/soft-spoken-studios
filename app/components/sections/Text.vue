<template>
  <div class="pb-8">
    <hr class="mb-6 border-t border-neutral-300 dark:border-neutral-700" />

    <div class="flex gap-4">
      <!-- Left Column - P2 (1/3) -->
      <div class="w-1/3 sticky top-0 self-start">
        <p class="text-base leading-normal text-muted-foreground">
          <slot name="p2">
            This is a secondary paragraph with supporting or contextual information. It uses a muted foreground color to indicate that this text is supplementary and less prominent than the primary content. This style works well for captions, descriptions, additional context, and explanatory notes that provide background information without demanding immediate attention.
          </slot>
        </p>
      </div>

      <!-- Right Column - P1 (2/3) -->
      <div class="w-2/3 space-y-4">
        <p class="text-lg leading-normal text-foreground">
          <slot name="p1">
            This is a primary paragraph with standard text styling and line height for readability. The quick brown fox jumps over the lazy dog. It demonstrates how text wraps and flows across multiple lines while maintaining consistent spacing and visual hierarchy. This paragraph is typically used for the main body content, featuring prominent foreground color that ensures excellent readability and visual prominence throughout the page.
          </slot>
        </p>

        <p class="text-lg leading-normal text-foreground">
          The generous line height ensures that even lengthy passages remain comfortable to read, and the consistent spacing between lines creates a smooth visual flow that guides the reader through the content naturally and intuitively. Each paragraph is carefully crafted to maintain visual coherence while delivering complex information in an accessible manner.
        </p>

        <p class="text-lg leading-normal text-foreground">
          Typography plays a crucial role in design systems, affecting not only how content looks but also how easily it can be consumed. By establishing clear hierarchy through size, weight, and color, we create a visual language that communicates meaning beyond the words themselves. The balance between aesthetics and functionality is essential for creating interfaces that are both beautiful and usable.
        </p>

        <p class="text-lg leading-normal text-foreground">
          When designing text layouts, considerations like line length, spacing, and font selection become paramount. A well-designed text column maintains optimal readability while conveying professionalism and attention to detail. These principles, applied consistently throughout a design system, create a cohesive experience that feels intentional and refined.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Text component with P1 and P2 paragraphs
</script>
