<template>
  <footer class="py-12">
    <hr class="mb-12 border-t border-neutral-300 dark:border-neutral-700" />
    <div class="flex items-baseline justify-between">
      <!-- Company Name -->
      <NuxtLink to="/">
        <span class="text-xl font-semibold">Soft Spoken Studios</span>
      </NuxtLink>

      <!-- Copyright -->
      <p class="text-muted-foreground text-md">
        &copy; {{ new Date().getFullYear() }} Soft Spoken Studios. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup></script>
