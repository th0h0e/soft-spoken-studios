<template>
  <UiContainer class="min-h-96 lg:min-h-[500px]">
    <div class="flex h-full items-start">
      <h1 class="text-4xl lg:text-5xl">
        {{ title }}
      </h1>
    </div>
  </UiContainer>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>