<template>
  <blockquote class="my-8 border-l-4 border-primary bg-muted p-6 italic">
    <div class="mb-4 text-lg leading-relaxed">
      <slot mdc-unwrap="p" />
    </div>
    <footer v-if="author || $slots.footer" class="text-sm font-semibold not-italic">
      <slot name="footer">
        <span v-if="author">— {{ author }}</span>
        <span v-if="source" class="font-normal text-muted-foreground">
          , {{ source }}
        </span>
      </slot>
    </footer>
  </blockquote>
</template>

<script setup>
/**
 * BlogQuote - Custom blockquote component with attribution
 *
 * Usage in Markdown:
 * ::blog-quote
 * ---
 * author: Steve Jobs
 * source: Stanford Commencement Speech
 * ---
 * Stay hungry, stay foolish.
 * ::
 *
 * Or with custom footer:
 * ::blog-quote
 * #default
 * The only way to do great work is to love what you do.
 *
 * #footer
 * — **Steve Jobs**, Apple Founder
 * ::
 */

defineProps({
  author: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
})
</script>
