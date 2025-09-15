<template>
  <div class="space-y-4">
    <!-- Search Panel - Always visible -->
    <div class="space-y-4">
      <!-- Search Input -->
      <div class="space-y-2">
        <UiInput
          id="search-input"
          v-model="searchQuery"
          type="search"
          placeholder="Search by title or description..."
          autofocus
          class="w-full"
        >
          <template #leading>
            <Icon name="lucide:search" class="w-4 h-4 text-muted-foreground" />
          </template>
        </UiInput>
      </div>

      <!-- Tags Filter -->
      <div v-if="availableTags.length" class="space-y-2">
        <div class="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          <UiBadge
            v-for="tag in availableTags"
            :key="tag"
            :variant="selectedTags.includes(tag) ? 'default' : 'outline'"
            class="cursor-pointer transition-colors text-xs"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </UiBadge>
        </div>
      </div>

      <!-- Clear Filters -->
      <div v-if="hasActiveFilters" class="pt-2 border-t">
        <UiButton
          @click="clearFilters"
          variant="ghost"
          size="sm"
          class="text-muted-foreground hover:text-foreground"
        >
          <Icon name="lucide:x" class="w-4 h-4 mr-1" />
          Clear Filters
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filtered'])

// State
const searchQuery = ref('')
const selectedTags = ref([])

// Computed properties
const availableTags = computed(() => {
  // Only show tags if there's a search query
  if (!searchQuery.value) {
    return []
  }

  const query = searchQuery.value.toLowerCase()
  const tags = new Set()

  props.articles.forEach(article => {
    article.tags?.forEach(tag => {
      // Show tag if it matches the search query
      if (tag.toLowerCase().includes(query)) {
        tags.add(tag)
      }
    })
  })

  return Array.from(tags).sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.length > 0 ||
         selectedTags.value.length > 0
})

const filteredArticles = computed(() => {
  let filtered = [...props.articles]

  // Text search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.preview?.toLowerCase().includes(query) ||
      article.description?.toLowerCase().includes(query) ||
      article.excerpt?.toLowerCase().includes(query)
    )
  }

  // Tag filter
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(article =>
      article.tags?.some(tag =>
        selectedTags.value.includes(tag)
      )
    )
  }

  return filtered
})

// Methods
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

// Watch for changes and emit filtered results
watch(filteredArticles, (newFiltered) => {
  emit('filtered', newFiltered)
}, { immediate: true })
</script>