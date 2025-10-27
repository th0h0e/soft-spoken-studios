<template>
  <footer>
    <div class="grid gap-4 py-12 lg:grid-cols-12">
      <!-- Empty column for sidebar (2/12) -->
      <div class="hidden lg:block lg:col-span-2"></div>

      <!-- Left Column - Company Name (7/12) -->
      <div class="lg:col-span-7">
        <NuxtLink to="/">
          <span class="text-xl font-semibold lg:text-lg">Soft Spoken Studios</span>
        </NuxtLink>
      </div>

      <!-- Right Column - Copyright (3/12) -->
      <div class="lg:col-span-3">
        <p class="text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Soft Spoken Studios. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
