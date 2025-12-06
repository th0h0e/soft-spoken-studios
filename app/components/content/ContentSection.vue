<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string
    class?: string
  }>(),
  {
    id: undefined,
    class: undefined
  }
)
</script>

<template>
  <div
    :id="props.id"
    class="py-18 sm:py-24 lg:py-32 px-4"
    :class="props.class"
  >
    <slot />
  </div>
</template>
