<template>
  <UiContainer as="footer" class="md:!px-0">
    <div class="grid gap-4 py-12 lg:grid-cols-8">
      <!-- Left Column - Company Name (matches main content column) -->
      <div class="lg:col-span-5">
        <NuxtLink to="/">
          <span class="text-xl font-semibold lg:text-lg">Soft Spoken Studios</span>
        </NuxtLink>
      </div>

      <!-- Right Column - Copyright (matches sidebar column) -->
      <div class="lg:col-span-3">
        <p class="text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Soft Spoken Studios. All rights reserved.
        </p>
      </div>
    </div>
  </UiContainer>
</template>

<script setup></script>
