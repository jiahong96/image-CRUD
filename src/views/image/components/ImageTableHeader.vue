<template>
  <div class="card-header bg-white p-4 p-md-6 pb-2 pb-md-4 border-bottom-0">
    <div class="d-flex mb-4">
      <h2
        v-if="tagFilter"
        class="card-title fw-normal me-3"
      >
        <router-link
          to="/tag"
          class="text-decoration-none"
        >
          Tags
        </router-link> {{ ` / ${tagFilter}` }}
      </h2>
      <h2
        v-else
        class="card-title fw-normal me-3"
      >
        Images
      </h2>
      <image-modal-create @created="$emit('created')" />
    </div>

    <!-- Filter Tag group -->
    <div
      v-if="!tagFilter"
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

    <!-- Search Input -->
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
  props: {
    tagFilter: {
      type: String,
      default: ''
    },
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
  color: #555555;
}

.btn-check:checked + .btn-tag, .btn-check:active + .btn-tag, .btn-check:hover + .btn-tag, .btn-tag.active, .btn-tag.dropdown-toggle.show {
  text-shadow: 0 0 .75px #555555, 0 0 .75px #555555;
  background-color: var(--bs-white);
}
</style>