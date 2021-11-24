<template>
  <div class="d-flex py-5 px-3 p-md-5">
    <h1 v-if="error">
      {{ errorMessage }}
    </h1>
    <image-card
      v-if="showCard"
      :image-url="image.image_path"
      :image-id="image.id"
      :title="image.name"
      :file-size="image.image_size_in_byte"
      :tags="imageData.tags"
      @refresh="showImage"
    />
  </div>
</template>

<script>
import ImageCard from './components/ImageCard.vue'
import ImageService from '@/api/ImageService'

export default {
  name: 'ImageShow',
  components: { ImageCard },
  data() {
    return {
      imageData: null,
      isLoading: false,
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    image () {
      return this.imageData.image || {} 
    },
    showCard () {
      return !this.error & !!this.imageData && !this.isLoading
    }
  },
  created () {
    this.showImage()
  },
  methods: {
    async showImage () {
      this.isLoading = true

      try {
        const response = await ImageService.show(this.$route.params.id)
        this.imageData = response.data
      } catch (error) {
        this.error = true
        this.errorMessage = error.response?.status === 404 ? 'Image not found' : 'Failed to load image'
      }

      this.isLoading = false
    }
  },
}
</script>