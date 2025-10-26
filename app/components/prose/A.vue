<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    class="underline underline-offset-2 hover:opacity-70 transition-opacity"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: '#'
  },
  target: {
    type: String,
    default: undefined
  },
  rel: {
    type: String,
    default: undefined
  }
})
</script>
