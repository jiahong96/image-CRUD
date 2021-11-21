<template>
  <div class="card-header bg-white p-5 border-bottom-0">
    <h4 class="card-title mb-4">
      Images
    </h4>
    <div
      class="btn-group row gx-0 gy-2 mb-4"
      role="group"
      aria-label="Filter group"
    >
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="col-auto"
      >
        <input
          :id="tag.id"
          name="btnradio"
          type="radio"
          class="btn-check"
          autocomplete="off"
          :checked="tag.id === 1"
        >
        <label
          class="btn btn-sm btn-outline-primary me-2 rounded-pill"
          :for="tag.id"
          @click="filter(tag)"
        > {{ `${tag.name} (${tag.images_count})` }} </label>
      </div>
    </div>

    <div class="d-flex">
      <input
        v-model="searchValue"
        class="form-control me-2"
        placeholder="Search"
        @keyup.enter="search"
      >
      <button
        class="btn bg-white shadow-sm"
        @click="search"
      >
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>
  </div>
</template>

<script>
import TagService from '@/api/TagService'

export default {
  data() {
    return {
      tags: [],
      searchValue: null
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      try {
        const response = await TagService.list()

        this.tags = [
          ...[ { id: 1, name: 'All', images_count: this.totalImageCount(response.data) } ], 
          ...response.data
        ]
      } catch (error) {
        console.log(error)
      }    
    },
    totalImageCount (tags) {
      return tags.reduce((total, tag) => total += tag.images_count, 0) 
    },
    filter (tag) {
      this.$emit('filter', tag)
    },
    search () {
      this.$emit('search', this.searchValue)
    }
  },
}
</script>