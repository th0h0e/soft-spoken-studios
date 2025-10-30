<template>
  <div class="col-span-2">
    <div class="md:sticky md:top-4 flex flex-col h-[calc(100vh-2rem)]">
      <div class="space-y-6">
        <!-- Title -->
        <div>
          <h2 class="text-base font-bold tracking-wider">Soft Spoken Studio</h2>
        </div>

        <!-- Navigation Links -->
        <nav class="space-y-3">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="block text-base hover:text-foreground transition-colors text-muted-foreground uppercase leading-none"
            :class="{ 'font-medium text-foreground': isActive(item.to) }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Lorem Ipsum - Bottom -->
      <p class="text-base text-muted-foreground leading-tight mt-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
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
