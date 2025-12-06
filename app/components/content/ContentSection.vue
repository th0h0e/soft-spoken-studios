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
    class="pb-24 sm:pb-32 lg:pb-48 px-4"
    :class="props.class"
  >
    <slot />
  </div>
</template>
