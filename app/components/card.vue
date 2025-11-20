<script setup lang="ts">
const { data: articles } = await useAsyncData('sidebar-articles', () =>
  queryCollection('writing').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <div class="flex flex-col gap-0">
    <UCard
      v-for="article in articles"
      :key="article.path"
      variant="outline"
    >
      <NuxtLink
        :to="article.path"
        class="group block"
      >
        <h3 class="text-sm font-medium mb-1">
          {{ article.title }}
        </h3>
        <p class="text-sm text-muted line-clamp-2">
          {{ article.description }}
        </p>
      </NuxtLink>
    </UCard>
  </div>
</template>
