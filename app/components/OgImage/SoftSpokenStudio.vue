<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from '#site-config/app/composables'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  colorMode?: 'dark' | 'light'
  theme?: string
}>(), {
  colorMode: 'dark',
  theme: 'neutral'
})

const siteConfig = useSiteConfig()
const pageTitle = computed(() => {
  return props.title || siteConfig.name || 'Soft Spoken Studio'
})
const pageDescription = computed(() => {
  return props.description || siteConfig.description || 'Word on These Streets'
})

const bgColor = computed(() => {
  return props.colorMode === 'light' ? 'bg-white' : 'bg-black'
})

const textColor = computed(() => {
  return props.colorMode === 'light' ? 'text-black' : 'text-white'
})

const mutedColor = computed(() => {
  return props.colorMode === 'light' ? 'text-gray-500' : 'text-gray-400'
})
</script>

<template>
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      font: Times New Roman,
      background-color: #000000;
      color: #ffffff;
    "
    :style="{
      backgroundColor: props.colorMode === 'light' ? '#ffffff' : '#000000',
      color: props.colorMode === 'light' ? '#000000' : '#ffffff'
    }"
  >
    <!-- Header section -->
    <div
      style="
        position: relative;
        z-index: 10;
        padding: 80px 80px 0 80px;
      "
    >
      <!-- Badge/headline -->
      <p
        style="
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 48px;
          color: #888888;
        "
        :style="{
          color: props.colorMode === 'light' ? '#666666' : '#888888'
        }"
      >
        Copywriting & Videoproduction
      </p>
    </div>

    <!-- Main content centered -->
    <div
      style="
        position: relative;
        z-index: 10;
        padding: 0 80px;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
      "
    >
      <h1
        style="
          font-size: 72px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
          margin-top: 0;
          max-width: 90%;
        "
      >
        {{ pageTitle }}
      </h1>
      <p
        style="
          font-size: 40px;
          line-height: 1.6;
          max-width: 90%;
          margin: 0;
          font-weight: 300;
        "
        :style="{
          color: props.colorMode === 'light' ? '#666666' : '#aaaaaa'
        }"
      >
        {{ pageDescription }}
      </p>
    </div>

    <!-- Footer with branding -->
    <div
      style="
        position: relative;
        z-index: 10;
        padding: 0 80px 80px 80px;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <!-- Divider line -->
        <div
          style="
            width: 48px;
            height: 1px;
            margin: 0;
          "
          :style="{
            backgroundColor: props.colorMode === 'light' ? '#cccccc' : '#444444'
          }"
        />
        <p
          style="
            font-size: 12px;
            letter-spacing: 0.05em;
            margin: 0;
          "
          :style="{
            color: props.colorMode === 'light' ? '#666666' : '#888888'
          }"
        >
          {{ siteConfig.name }}
        </p>
      </div>
    </div>
  </div>
</template>
