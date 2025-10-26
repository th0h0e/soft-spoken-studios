<template>
  <img
    :src="src"
    :alt="alt"
    :title="title"
    :width="width"
    :height="height"
    class="my-6 rounded"
  />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: undefined
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>
