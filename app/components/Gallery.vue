<template>
  <div class="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <!-- Tall portrait -->
    <div class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/3334f4a0741954580a818e303927dfcd.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Quiet moments in natural light.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/8bfedd83aec8466a4708d60ec299d164.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Urban textures and patterns.</p>
    </div>

    <!-- Wide landscape -->
    <div class="col-span-2">
      <UiAspectRatio :ratio="16 / 9" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/90d52ee25f93c3e7deaf019956a6089b.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Wide open spaces and horizon lines.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/e47e2b38b00596e3c5fa172eeeacb3e1.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Candid street photography.</p>
    </div>

    <!-- Tall portrait -->
    <div class="row-span-2">
      <UiAspectRatio :ratio="2 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/fd309fc3f9fd1bde17a2c0c2f9ec4d67.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="600"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Abstract forms and shadows.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/0cb12b5fba26e02dec8f0ab5f325c334.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Details in everyday objects.</p>
    </div>

    <!-- Horizontal rectangle -->
    <div class="col-span-2">
      <UiAspectRatio :ratio="4 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/75a0147226ad9ec53bb8f4ef9a16b48e.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="800"
          height="600"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Architectural lines and geometry.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/aa665c5305ce9ce280f8983d1eac49b3.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Personal moments captured.</p>
    </div>

    <!-- Vertical rectangle -->
    <div>
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/aca7dce603845cdd7cfa134bfba03060.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Movement and energy.</p>
    </div>

    <!-- Wide landscape -->
    <div class="col-span-2">
      <UiAspectRatio :ratio="16 / 10" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/c7cb6ff8df2b3bcc233eda201420fb2a.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="800"
          height="500"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Cinematic compositions and mood.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/3334f4a0741954580a818e303927dfcd.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Light and shadow play.</p>
    </div>

    <!-- Tall portrait -->
    <div class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/8bfedd83aec8466a4708d60ec299d164.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Intimate documentary moments.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/90d52ee25f93c3e7deaf019956a6089b.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Textural surfaces and materials.</p>
    </div>

    <!-- Wide landscape -->
    <div class="col-span-2">
      <UiAspectRatio :ratio="16 / 9" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/e47e2b38b00596e3c5fa172eeeacb3e1.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Expansive landscapes and horizons.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/fd309fc3f9fd1bde17a2c0c2f9ec4d67.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="600"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Urban environments and people.</p>
    </div>

    <!-- Vertical rectangle -->
    <div>
      <UiAspectRatio :ratio="2 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/0cb12b5fba26e02dec8f0ab5f325c334.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Vertical compositions and depth.</p>
    </div>

    <!-- Horizontal rectangle -->
    <div class="col-span-2">
      <UiAspectRatio :ratio="4 / 3" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/75a0147226ad9ec53bb8f4ef9a16b48e.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="800"
          height="600"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Minimalist framing and space.</p>
    </div>

    <!-- Square -->
    <div>
      <UiAspectRatio :ratio="1 / 1" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/aa665c5305ce9ce280f8983d1eac49b3.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="400"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Color and contrast studies.</p>
    </div>

    <!-- Tall portrait -->
    <div class="row-span-2">
      <UiAspectRatio :ratio="3 / 4" class="bg-muted mb-2 overflow-hidden rounded-lg">
        <NuxtImg
          src="/images/aca7dce603845cdd7cfa134bfba03060.jpg"
          alt="Gallery image"
          class="h-full w-full object-cover"
          width="400"
          height="533"
        />
      </UiAspectRatio>
      <p class="text-muted-foreground text-xs">Emotional storytelling through image.</p>
    </div>
  </div>
</template>

<script setup></script>
