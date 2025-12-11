<script setup lang="ts">
const route = useRoute()
const clipboard = useClipboard()
const toast = useToast()

async function copyLink() {
  await clipboard.copy(window.location.href)
  toast.add({ title: 'Copied to clipboard', icon: 'i-feather-check-circle', color: 'success' })
}

async function share() {
  await navigator.share({ url: route.fullPath })
}

const shareMenuItems = [
  {
    label: 'Copy URL',
    icon: 'i-feather-link',
    onSelect: copyLink
  }
]
</script>

<template>
  <UFieldGroup class="w-full">
    <UButton
      label="Share this article"
      icon="i-feather-share-2"
      variant="subtle"
      color="neutral"
      class="grow"
      @click="share"
    />
    <UDropdownMenu :items="shareMenuItems">
      <UButton
        icon="i-feather-chevron-down"
        variant="subtle"
        color="neutral"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
