<template>
  <div
    class="card card-shadow p-5 w-100"
  >
    <h2 class="fw-normal mb-4">
      <router-link
        to="/home"
        class="text-decoration-none"
      >
        Images
      </router-link> {{ ` / ${title}` }}
    </h2>
    <div class="row g-0">
      <div class="col-md-4">
        <img
          class="contain"
          :src="`${$http.defaults.baseURL}${imageUrl}`"
          alt="image"
          width="350"
          height="350"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title fw-bolder fs-2">
            {{ title }}
          </h5>

          <p class="card-text">
            <small class="text-black">{{ $bytesToSize(fileSize) }}</small>
          </p>

          <button
            class="btn btn-sm btn-light me-3"
            @click="edit"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-light"
            @click="remove"
          >
            Delete
          </button>

          <div class="mt-4">
            <p class="mb-1">
              Tags
            </p>
            <div class="row g-5">
              <div class="col-auto">
                <tag
                  v-for="(name, key) in imageTags(tags)"
                  :key="key"
                  :text="name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <image-modal-edit 
      :image-id="imageId"
      :image-name="title"
      :is-visible.sync="showEditModal"
      @updated="refresh"
    />
    <image-modal-delete 
      :image-id="imageId"
      :image-name="title"
      :is-visible.sync="showDeleteModal"
      @deleted="refresh"
    />
  </div>
</template>

<script>
import Tag from '@/components/ImageTag'
import ImageModalEdit from '@/components/ImageModalEdit.vue'
import ImageModalDelete from '@/components/ImageModalDelete.vue'

export default {
  components: {
    Tag,
    ImageModalEdit,
    ImageModalDelete,
  },
  props: {
    imageId: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showEditModal: false,
      showDeleteModal: false
    }
  },
  methods: {
    imageTags (tags) {
      return tags.reduce((accumulated, currentValue) => {
        accumulated[currentValue.tag_id] = currentValue.concept_name
        return accumulated
      }, {}) || {}
    },
    edit () {
      this.showEditModal = true
    },
    remove () {
      this.showDeleteModal = true
    },
    refresh () {
      this.$emit('refresh')
    }
  },
}
</script>

<style scoped>
div.card {
  height:738px;
}
</style>