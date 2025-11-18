<script setup lang="ts">
/**
 * Card Component for Right Sidebar
 *
 * Displays 3 latest blog posts in header, body, and footer slots
 */

const { data: articles } = await useAsyncData('sidebar-articles', () =>
  queryCollection('writing').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'flex flex-col h-full',
      body: 'flex-1'
    }"
  >
    <!-- First Article in Header -->
    <template
      v-if="articles && articles[0]"
      #header
    >
      <NuxtLink
        :to="articles[0].path"
        class="group block"
      >
        <h3 class="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
          {{ articles[0].title }}
        </h3>
        <p class="text-xs text-muted line-clamp-2">
          {{ articles[0].description }}
        </p>
      </NuxtLink>
    </template>

    <!-- Second Article in Body -->
    <NuxtLink
      v-if="articles && articles[1]"
      :to="articles[1].path"
      class="group block"
    >
      <h3 class="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
        {{ articles[1].title }}
      </h3>
      <p class="text-xs text-muted line-clamp-2">
        {{ articles[1].description }}
      </p>
    </NuxtLink>

    <!-- Third Article in Footer -->
    <template
      v-if="articles && articles[2]"
      #footer
    >
      <NuxtLink
        :to="articles[2].path"
        class="group block"
      >
        <h3 class="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
          {{ articles[2].title }}
        </h3>
        <p class="text-xs text-muted line-clamp-2">
          {{ articles[2].description }}
        </p>
      </NuxtLink>
    </template>
  </UCard>
</template>
