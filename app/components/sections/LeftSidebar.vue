<template>
  <div class="col-span-2">
    <div class="md:sticky md:top-4">
      <div class="space-y-6">
        <!-- Title -->
        <div>
          <h2 class="text-base font-normal tracking-wider uppercase">Soft Spoken Studio</h2>
        </div>

        <!-- Navigation Links -->
        <nav class="space-y-3">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="block text-sm hover:text-foreground/70 transition-colors text-foreground/90 uppercase"
            :class="{ 'font-medium text-foreground': isActive(item.to) }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Work", to: "/work" },
  { name: "Blog", to: "/blog" },
  { name: "Gallery", to: "/gallery" },
];

const isActive = (path) => {
  return route.path === path;
};
</script>
