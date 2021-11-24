<template>
  <div class="card card-shadow">
    <tag-table-header @search="setSearch" />
    
    <div
      v-show="!isLoading"
      class="card-body table-responsive p-0"
    >
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(header, i) in headers"
              :key="i"
              :class="header.class"
              scope="col"
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- footer -->
  </div>
</template>

<script>
import TagService from '@/api/TagService'
import TagTableHeader from './TagTableHeader.vue'

export default {
  components: { TagTableHeader },
  data() {
    return {
      tags: null,
      isLoading: false,
      search: null,
      headers: [
        {value: 'tag', name: 'Tag', class: 'ps-5'},
        {value: 'total', name: 'Total Images', class: 'text-center fw-normal'},
        {value: 'action', name: '', class: 'text-center'}
      ]
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      this.isLoading = true
      try {
        const response = await TagService.list()
        this.tags = response.data
      } catch (error) {
        console.log(error)
      }    
      
      this.isLoading = false
    }, 
    setSearch (value) {
      this.search = value  || ''
    }
  },
}
</script>