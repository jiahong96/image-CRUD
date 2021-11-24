<template>
  <div class="card card-shadow">
    <!-- header -->
    <!-- body -->
    <!-- footer -->
  </div>
</template>

<script>
import TagService from '@/api/TagService'

export default {
  data() {
    return {
      tags: null,
      isLoading: false
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
  },
}
</script>