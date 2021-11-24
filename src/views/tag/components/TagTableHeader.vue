<template>
  <div class="card-header bg-white p-5 border-bottom-0">
    <h2
      class="card-title fw-normal mb-4"
    >
      Tags
    </h2>

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
import SearchButton from '@/components/SearchButton.vue'
export default {
  components: {
    SearchButton,
  },
  data() {
    return {
      searchValue: null
    }
  },
  methods: {
    search () {
      this.$emit('search', this.searchValue)
    }
  },
}
</script>