<template>
  <div class="card-header bg-white p-5 border-bottom-0">
    <div class="d-flex mb-4">
      <h2
        class="card-title fw-normal me-3"
      >
        Images
      </h2>
      <image-modal-create @created="$emit('created')" />
    </div>

    <div
      class="btn-group row g-3 mb-5"
      role="group"
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
          class="btn btn-tag py-2 rounded-pill"
          :for="tag.id"
          @click="filter(tag)"
        > {{ `${tag.name} (${tag.images_count})` }} </label>
      </div>
    </div>

    <div class="d-flex">
      <input
        v-model="searchValue"
        class="form-control me-3"
        placeholder="Search"
        @keyup.enter="search"
      >
      <search-button @click="search" />
    </div>
  </div>
</template>

<script>
import TagService from '@/api/TagService'
import SearchButton from '../../../components/SearchButton.vue'
import ImageModalCreate from './ImageModalCreate.vue'

export default {
  components: {
    SearchButton,
    ImageModalCreate,
  },
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

<style scoped>
.btn-tag {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
}

.btn-check:checked + .btn-tag, .btn-check:active + .btn-tag, .btn-check:hover + .btn-tag, .btn-tag.active, .btn-tag.dropdown-toggle.show {
  color: var(--bs-primary);
  font-weight: 700;
  background-color: var(--bs-white);
}
</style>