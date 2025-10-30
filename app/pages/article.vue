<template>
  <div>
    <SectionsTitle>
      <template #h1>Article Title</template>
      <template #h3>Article Subtitle</template>
    </SectionsTitle>
    <SectionsText />
    <SectionsImage169 />
    <SectionsText />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'articles'
});
</script>
