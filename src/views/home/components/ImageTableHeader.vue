<template>
  <div class="card-header bg-white p-5 border-bottom-0">
    <h2 class="card-title mb-4 fw-normal">
      Images
    </h2>
    <div
      class="btn-group row gx-0 gy-2 mb-4"
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
          class="btn btn-outline-primary border-white shadow-sm p-3 me-2 rounded-pill"
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

export default {
  components: {
    SearchButton,
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

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show {
  color: $primary;
  font-weight: $font-weight-bold;
  background-color: $white;
}
</style>