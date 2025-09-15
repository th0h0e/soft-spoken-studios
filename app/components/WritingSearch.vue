<template>
  <div class="space-y-4">
    <!-- Search Toggle -->
    <div class="flex items-center justify-between">
      <UiButton
        @click="toggleSearch"
        variant="ghost"
        class="text-muted-foreground hover:text-foreground"
      >
        <Icon :name="showSearch ? 'lucide:x' : 'lucide:search'" class="w-4 h-4 mr-2" />
        {{ showSearch ? 'Hide Search' : 'Search & Filter' }}
      </UiButton>
    </div>

    <!-- Search Panel -->
    <div v-if="showSearch" class="space-y-4 p-4 border rounded-lg bg-muted/30">
      <!-- Search Input -->
      <div class="space-y-2">
        <label for="search-input" class="text-sm font-medium">Search Articles</label>
        <UiInput
          id="search-input"
          v-model="searchQuery"
          placeholder="Search by title or description..."
          class="w-full"
        >
          <template #leading>
            <Icon name="lucide:search" class="w-4 h-4 text-muted-foreground" />
          </template>
        </UiInput>
      </div>

      <!-- Categories Filter -->
      <div v-if="availableCategories.length" class="space-y-2">
        <label class="text-sm font-medium">Categories</label>
        <div class="flex flex-wrap gap-2">
          <UiBadge
            v-for="category in availableCategories"
            :key="category"
            :variant="selectedCategories.includes(category) ? 'default' : 'secondary'"
            class="cursor-pointer transition-colors"
            @click="toggleCategory(category)"
          >
            {{ category }}
          </UiBadge>
        </div>
      </div>

      <!-- Tags Filter -->
      <div v-if="availableTags.length" class="space-y-2">
        <label class="text-sm font-medium">Tags</label>
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
const showSearch = ref(false)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedTags = ref([])

// Computed properties
const availableCategories = computed(() => {
  const categories = new Set()
  props.articles.forEach(article => {
    article.categories?.forEach(category => categories.add(category))
  })
  return Array.from(categories).sort()
})

const availableTags = computed(() => {
  const tags = new Set()
  props.articles.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.length > 0 ||
         selectedCategories.value.length > 0 ||
         selectedTags.value.length > 0
})

const filteredArticles = computed(() => {
  let filtered = [...props.articles]

  // Text search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description?.toLowerCase().includes(query) ||
      article.excerpt?.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(article =>
      article.categories?.some(category =>
        selectedCategories.value.includes(category)
      )
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
const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

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
  selectedCategories.value = []
  selectedTags.value = []
}

// Watch for changes and emit filtered results
watch(filteredArticles, (newFiltered) => {
  emit('filtered', newFiltered)
}, { immediate: true })
</script>