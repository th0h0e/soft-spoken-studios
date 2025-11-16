<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <UPage>
      <UPageHero
        title="Gallery"
        description="Explore our collection"
        :ui="{
          title: '!mx-0 text-left',
          description: '!mx-0 text-left'
        }"
      />
      <div class="py-8">
        <USeparator
          color="neutral"
          type="solid"
        />
      </div>
      <UPageSection>
        <PageColumns />
      </UPageSection>
    </UPage>
  </div>
</template>
