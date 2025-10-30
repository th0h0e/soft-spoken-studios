<template>
  <div>
    <div class="relative mb-4 rounded overflow-hidden w-full" style="aspect-ratio: 16 / 9;">
      <!-- Custom Thumbnail Overlay -->
      <div
        v-if="!isPlaying && thumbnail"
        @click="playVideo"
        class="absolute inset-0 z-10 cursor-pointer"
      >
        <NuxtImg
          :src="thumbnail"
          alt="Video thumbnail"
          class="h-full w-full object-cover"
          width="800"
          height="450"
        />
      </div>

      <!-- YouTube Video -->
      <iframe
        v-if="videoId"
        :src="iframeSrc"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="absolute inset-0 w-full h-full border-0"
        loading="lazy"
      />
      <div v-else class="text-muted-foreground flex h-full w-full items-center justify-center bg-muted">
        Invalid video URL
      </div>
    </div>
    <p class="text-muted-foreground text-sm italic">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
  // Props
  const props = withDefaults(
    defineProps<{
      url?: string;
      caption?: string;
      thumbnail?: string;
    }>(),
    {
      url: "",
      caption: "Client project - Brand storytelling video",
      thumbnail: "",
    }
  );

  // State
  const isPlaying = ref(false);

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

  // Build iframe src with autoplay when playing
  const iframeSrc = computed(() => {
    if (!videoId.value) return "";
    const autoplay = isPlaying.value ? "1" : "0";
    return `https://www.youtube.com/embed/${videoId.value}?autoplay=${autoplay}`;
  });

  // Play video (hide thumbnail and autoplay)
  const playVideo = () => {
    isPlaying.value = true;
  };
</script>
