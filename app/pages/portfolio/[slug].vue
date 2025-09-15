<script lang="ts" setup>
import type { Collections } from '@nuxt/content'
import { withLeadingSlash, joinURL } from 'ufo'

const route = useRoute()

const slug = computed(() => route.params.slug as string)
const path = computed(() => withLeadingSlash(joinURL('portfolio', slug.value)))

const { data: project } = await useAsyncData(path.value, async () =>
  await queryCollection('portfolio').path(path.value).first()
)

if (!project.value)
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })

// Set page head for SEO
useHead({
  title: project.value.title,
  meta: [
    { name: 'description', content: project.value.description }
  ]
})
</script>

<template>
  <div v-if="project">
    <div>
      <!-- Back Button -->
      <NuxtLink to="/work">
        ← Back to Portfolio
      </NuxtLink>

      <!-- Project Header -->
      <h1>{{ project.title }}</h1>

      <!-- Meta Information -->
      <div>
        <span>{{ project.date }}</span>
        <span v-if="project.client">Client: {{ project.client }}</span>
      </div>

      <!-- Services -->
      <div v-if="project.services?.length">
        <h3>Services:</h3>
        <span v-for="service in project.services" :key="service">
          {{ service }}
        </span>
      </div>

      <!-- Technologies -->
      <div v-if="project.technologies?.length">
        <h3>Technologies:</h3>
        <span v-for="tech in project.technologies" :key="tech">
          {{ tech }}
        </span>
      </div>

      <!-- Project Links -->
      <div>
        <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank">
          View Live Project
        </a>
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank">
          View on GitHub
        </a>
      </div>

      <!-- Project Content -->
      <ContentRenderer :value="project" />

      <!-- Navigation -->
      <div>
        <NuxtLink to="/work">
          ← All Projects
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>Project not found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <NuxtLink to="/work">Back to Portfolio</NuxtLink>
    </div>
  </div>
</template>