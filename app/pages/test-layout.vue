<script setup lang="ts">
definePageMeta({
  layout: 'default2'
})
</script>

<template>
  <UPage>
    <!-- Left sticky sidebar with navigation -->
    <template #left>
      <UPageAside>
        <Navigation />
      </UPageAside>
    </template>

    <!-- Main content area -->
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">
          Testing default2 Layout
        </h1>
        <p class="text-muted">
          This page uses the new default2 layout with sticky sidebars!
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Layout Features
        </h2>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-primary font-bold">✓</span>
            <span><strong>Left Sidebar:</strong> Navigation component with vertical menu</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-bold">✓</span>
            <span><strong>Center Content:</strong> Main page content area with header and footer</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-bold">✓</span>
            <span><strong>Right Sidebar:</strong> Custom Card component</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-bold">✓</span>
            <span><strong>Sticky Positioning:</strong> Both sidebars are sticky (lg breakpoint and above)</span>
          </li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          How It Works
        </h2>
        <p class="text-sm text-muted">
          The layout uses Nuxt UI's <code class="bg-elevated px-2 py-1 rounded text-xs">UPage</code> component to create a grid layout with:
        </p>
        <ul class="space-y-2 text-sm ml-4 list-disc">
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">#left</code> slot for sidebar navigation</li>
          <li>Default slot for main content</li>
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">#right</code> slot for additional content</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Navigation
        </h2>
        <p class="text-sm text-muted">
          Try clicking the navigation items in the left sidebar to navigate between pages. The Navigation component uses <code class="bg-elevated px-2 py-1 rounded text-xs">navLinks</code> from <code class="bg-elevated px-2 py-1 rounded text-xs">~/utils/links.ts</code>.
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Customization
        </h2>
        <p class="text-sm text-muted">
          You can customize this layout by editing:
        </p>
        <ul class="space-y-2 text-sm ml-4 list-disc">
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">app/layouts/default2.vue</code> - Layout structure</li>
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">app/components/Navigation.vue</code> - Left sidebar navigation</li>
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">app/components/Card.vue</code> - Right sidebar card</li>
          <li><code class="bg-elevated px-2 py-1 rounded text-xs">app/utils/links.ts</code> - Navigation links data</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Carousel Component
        </h2>
        <p class="text-sm text-muted">
          Testing the UCarousel component with autoplay and navigation:
        </p>
        <Carousel />
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Drawer Component
        </h2>
        <p class="text-sm text-muted">
          A drawer that smoothly slides in from the bottom of the screen:
        </p>
        <UDrawer
          title="Edit Profile"
          description="Make changes to your profile here."
        >
          <UButton
            label="Open Drawer"
            color="primary"
            trailing-icon="i-lucide-chevron-up"
          />

          <template #body>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium">Name</label>
                <UInput
                  placeholder="Enter your name"
                  class="mt-1"
                />
              </div>
              <div>
                <label class="text-sm font-medium">Email</label>
                <UInput
                  placeholder="Enter your email"
                  type="email"
                  class="mt-1"
                />
              </div>
            </div>
          </template>

          <template #footer>
            <UButton
              label="Save Changes"
              color="primary"
              block
            />
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              block
            />
          </template>
        </UDrawer>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Textarea Component
        </h2>
        <p class="text-sm text-muted">
          A multi-line text input field with neutral color and subtle variant:
        </p>
        <TextArea />
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          ChangelogVersions Component
        </h2>
        <p class="text-sm text-muted">
          Display a timeline of version releases with images and descriptions:
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          PageColumns Component
        </h2>
        <p class="text-sm text-muted">
          A responsive masonry-style grid displaying testimonials and cards:
        </p>
        <PageColumns />
      </div>
    </div>

    <!-- Right sticky sidebar with your custom card -->
    <template #right>
      <UPageAside>
        <Card />
      </UPageAside>
    </template>
  </UPage>
</template>
