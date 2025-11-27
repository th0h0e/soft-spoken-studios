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
</script>

<template>
  <div
    :style="{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'Times New Roman, serif',
      backgroundColor: props.colorMode === 'light' ? '#ffffff' : '#000000',
      color: props.colorMode === 'light' ? '#000000' : '#ffffff'
    }"
  >
    <!-- Header section -->
    <div
      :style="{
        position: 'relative',
        zIndex: 10,
        padding: '80px 80px 0 80px'
      }"
    >
      <!-- Badge/headline -->
      <p
        :style="{
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '48px',
          color: props.colorMode === 'light' ? '#666666' : '#888888'
        }"
      >
        Copywriting & Videoproduction
      </p>
    </div>

    <!-- Main content centered -->
    <div
      :style="{
        position: 'relative',
        zIndex: 10,
        padding: '0 80px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
      }"
    >
      <h1
        :style="{
          fontSize: '72px',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '32px',
          marginTop: 0,
          maxWidth: '90%'
        }"
      >
        {{ pageTitle }}
      </h1>
      <p
        :style="{
          fontSize: '40px',
          lineHeight: 1.6,
          maxWidth: '90%',
          margin: 0,
          fontWeight: 300,
          color: props.colorMode === 'light' ? '#666666' : '#aaaaaa'
        }"
      >
        {{ pageDescription }}
      </p>
    </div>

    <!-- Footer with branding -->
    <div
      :style="{
        position: 'relative',
        zIndex: 10,
        padding: '0 80px 80px 80px'
      }"
    >
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }"
      >
        <!-- Divider line -->
        <div
          :style="{
            width: '48px',
            height: '1px',
            margin: 0,
            backgroundColor: props.colorMode === 'light' ? '#cccccc' : '#444444'
          }"
        />
        <p
          :style="{
            fontSize: '12px',
            letterSpacing: '0.05em',
            margin: 0,
            color: props.colorMode === 'light' ? '#666666' : '#888888'
          }"
        >
          {{ siteConfig.name }}
        </p>
      </div>
    </div>
  </div>
</template>
