<template>
  <div class="space-y-12">
    <!-- Section Header -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">How We Work</h2>
      <p class="text-base text-muted-foreground leading-relaxed max-w-2xl">
        Our approach is intentional and collaborative. We listen, we create, and we deliver work that truly matters.
      </p>
    </div>

    <!-- Process Steps Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Step 1: Discovery -->
      <Motion
        initial="initial"
        in-view="animate"
        :variants="{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }"
      >
        <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-8 transition-all hover:shadow-md hover:border-primary/20">
          <!-- Decorative corner accent -->
          <div class="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

          <div class="relative space-y-4">
            <!-- Icon and number -->
            <div class="flex items-start justify-between">
              <div class="flex items-center justify-center size-16 rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Icon name="feather:lightbulb" class="size-7 text-primary" />
              </div>
              <span class="text-3xl font-bold text-primary/20 transition-colors group-hover:text-primary/30">01</span>
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Discovery</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                We dive deep into understanding your vision, goals, and the story you want to tell. Your perspective guides everything we create.
              </p>
            </div>
          </div>
        </div>
      </Motion>

      <!-- Step 2: Creation -->
      <Motion
        initial="initial"
        in-view="animate"
        :variants="{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }"
      >
        <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-8 transition-all hover:shadow-md hover:border-primary/20">
          <!-- Decorative corner accent -->
          <div class="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

          <div class="relative space-y-4">
            <!-- Icon and number -->
            <div class="flex items-start justify-between">
              <div class="flex items-center justify-center size-16 rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Icon name="feather:edit-3" class="size-7 text-primary" />
              </div>
              <span class="text-3xl font-bold text-primary/20 transition-colors group-hover:text-primary/30">02</span>
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Creation</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                We craft with precision and care. Whether it's video production or copywriting, every detail matters and serves your message.
              </p>
            </div>
          </div>
        </div>
      </Motion>

      <!-- Step 3: Delivery -->
      <Motion
        initial="initial"
        in-view="animate"
        :variants="{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
        }"
      >
        <div class="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-8 transition-all hover:shadow-md hover:border-primary/20">
          <!-- Decorative corner accent -->
          <div class="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

          <div class="relative space-y-4">
            <!-- Icon and number -->
            <div class="flex items-start justify-between">
              <div class="flex items-center justify-center size-16 rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Icon name="feather:check-circle" class="size-7 text-primary" />
              </div>
              <span class="text-3xl font-bold text-primary/20 transition-colors group-hover:text-primary/30">03</span>
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Delivery</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                We deliver polished, ready-to-use work. Your success is our success, and we're here to support you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";
</script>
