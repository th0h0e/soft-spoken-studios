<template>
  <div>
    <UiAspectRatio :ratio="16 / 9" class="mb-2 overflow-hidden rounded">
      <iframe
        v-if="videoId"
        :src="`https://www.youtube.com/embed/${videoId}`"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="h-full w-full"
        loading="lazy"
      />
      <div v-else class="text-muted-foreground flex h-full w-full items-center justify-center">
        Invalid video URL
      </div>
    </UiAspectRatio>
    <p class="text-muted-foreground text-xs">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
  // Props
  const props = withDefaults(
    defineProps<{
      url?: string;
      caption?: string;
    }>(),
    {
      url: "",
      caption: "Client project - Brand storytelling video",
    }
  );

  // Extract video ID from various YouTube URL formats
  const videoId = computed(() => {
    if (!props.url) return "";

    let id = "";

    // Handle standard youtube.com URLs
    if (props.url.includes("youtube.com/watch?v=")) {
      const match = props.url.match(/youtube\.com\/watch\?v=([^&]+)/);
      if (match) id = match[1];
    }
    // Handle youtu.be short URLs
    else if (props.url.includes("youtu.be/")) {
      const match = props.url.match(/youtu\.be\/([^?]+)/);
      if (match) id = match[1];
    }
    // Handle embed URLs
    else if (props.url.includes("/embed/")) {
      const match = props.url.match(/embed\/([^?]+)/);
      if (match) id = match[1];
    }
    // Handle just the video ID
    else if (props.url.match(/^[a-zA-Z0-9_-]{11}$/)) {
      id = props.url;
    }

    return id;
  });
</script>
