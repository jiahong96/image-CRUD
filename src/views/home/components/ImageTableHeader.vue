<template>
  <div class="card-header bg-white p-5 border-bottom-0">
    <h5 class="card-title">
      Images
    </h5>
  </div>
</template>

<script>
import TagService from '@/api/TagService'

export default {
  data() {
    return {
      tags: []
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
</script>