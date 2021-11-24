<template>
  <div class="d-flex py-5 px-3 p-md-5">
    <h1 v-if="error">
      {{ errorMessage }}
    </h1>
    <image-card
      v-if="!error && !!imageData"
      :image-url="image.image_path"
      :image-id="image.id"
      :title="image.name"
      :file-size="image.image_size_in_byte"
      :tags="imageData.tags"
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
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    image () {
      return this.imageData.image || {} 
    }
  },
  created () {
    this.showImage()
  },
  methods: {
    async showImage () {
      try {
        console.log('initial load')
        const response = await ImageService.show(this.$route.params.id)
        this.imageData = response.data
      } catch (error) {
        console.log(error)
        this.error = true
        this.errorMessage = error.response?.status === 404 ? 'Image not found' : 'Failed to load image'
      }
    }
  },
}
</script>