<template>
  <UiContainer as="footer" class="md:!px-0">
    <div class="grid gap-4 py-12 lg:grid-cols-10">
      <!-- Left Column - Company Name (7/10) -->
      <div class="lg:col-span-7">
        <NuxtLink to="/">
          <span class="text-xl font-semibold lg:text-lg">Soft Spoken Studios</span>
        </NuxtLink>
      </div>

      <!-- Right Column - Copyright (3/10) -->
      <div class="lg:col-span-3">
        <p class="text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Soft Spoken Studios. All rights reserved.
        </p>
      </div>
    </div>
  </UiContainer>
</template>

<script setup></script>
