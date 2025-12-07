<template>
  <UContainer>
    <div class="py-12">
      <h1 class="text-4xl font-bold mb-8">
        Card Variants
      </h1>
      <p class="text-muted mb-12">
        Explore the different card variants and how the global configuration affects each one.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Solid Variant -->
        <UCard variant="solid">
          <template #header>
            <h3 class="text-lg font-semibold">
              Solid Variant
            </h3>
          </template>

          <p class="mb-4">
            This card uses the <code>solid</code> variant with inverted colors for maximum contrast.
            Perfect for highlighting important information.
          </p>
          <p class="text-sm opacity-80">
            Header, body, and footer all have <code>bg-inverted</code> backgrounds.
          </p>

          <template #footer>
            <UButton label="Take Action" />
          </template>
        </UCard>

        <!-- Outline Variant -->
        <UCard variant="outline">
          <template #header>
            <h3 class="text-lg font-semibold">
              Outline Variant
            </h3>
          </template>

          <p class="mb-4">
            This card uses the <code>outline</code> variant with a ring border and default backgrounds.
            This is the default variant for all cards.
          </p>
          <p class="text-sm text-muted">
            All sections have <code>bg-default</code> backgrounds with a ring border.
          </p>

          <template #footer>
            <UButton
              label="Learn More"
              variant="outline"
            />
          </template>
        </UCard>

        <!-- Soft Variant -->
        <UCard variant="soft">
          <template #header>
            <h3 class="text-lg font-semibold">
              Soft Variant
            </h3>
          </template>

          <p class="mb-4">
            This card uses the <code>soft</code> variant with a subtle elevated background throughout.
            Great for creating visual hierarchy without harsh borders.
          </p>
          <p class="text-sm text-muted">
            All sections have <code>bg-elevated/50</code> for a unified soft look.
          </p>

          <template #footer>
            <UButton
              label="Explore"
              variant="soft"
            />
          </template>
        </UCard>

        <!-- Subtle Variant -->
        <UCard variant="subtle">
          <template #header>
            <h3 class="text-lg font-semibold">
              Subtle Variant
            </h3>
          </template>

          <p class="mb-4">
            This card uses the <code>subtle</code> variant with transparent header and elevated body/footer.
            Ideal for cards with images in the header section.
          </p>
          <p class="text-sm text-muted">
            Header has no background, while body and footer have <code>bg-elevated/50</code>.
          </p>

          <template #footer>
            <UButton
              label="View Details"
              variant="subtle"
            />
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
