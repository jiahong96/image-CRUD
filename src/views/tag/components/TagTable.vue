<template>
  <div class="card card-shadow">
    <tag-table-header @search="setSearch" />
    <!-- body -->
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
      search: null
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