<template>
  <div
    class="card card-shadow p-4 p-md-6 w-100"
    style="min-height:80vh"
  > 
    <!-- card header -->
    <h2 class="fw-normal mb-4">
      <router-link
        to="/home"
        class="text-decoration-none"
      >
        Images
      </router-link> {{ ` / ${title}` }}
    </h2>

    <div class="d-flex flex-column flex-md-row">
      <!-- image section -->
      <img
        class="contain"
        :src="`${$http.defaults.baseURL}${imageUrl}`"
        alt="image"
        width="350"
        height="350"
      >

      <!-- image details section -->
      <div class="card-body ms-md-5">
        <h5 class="card-title fw-bolder fs-2">
          {{ title }}
        </h5>

        <p class="card-text">
          <small>{{ $bytesToSize(fileSize) }}</small>
        </p>

        <!-- action buttons -->
        <button
          class="btn btn-sm btn-light me-3"
          @click="edit"
        >
          <span class="fs-6">Edit</span>
        </button>
        <button
          class="btn btn-sm btn-light"
          @click="remove"
        >
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <span class="fs-6 ms-2">Delete</span>
        </button>

        <!-- tags -->
        <div class="mt-4">
          <p class="mb-2 text-black">
            Tags
          </p>
          <div class="row g-2">
            <div
              v-for="(name, key) in imageTags(tags)"
              :key="key"
              class="col-auto"
            >
              <tag                
                :text="name"
                @click="showTag(name)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modals -->
    <image-modal-edit 
      :image-id="imageId"
      :image-name="title"
      :is-visible.sync="showEditModal"
      @updated="updated"
    />
    <image-modal-delete 
      :image-id="imageId"
      :image-name="title"
      :is-visible.sync="showDeleteModal"
      @deleted="deleted"
    />
  </div>
</template>

<script>
import Tag from '@/components/ImageTag'
import ImageModalEdit from './ImageModalEdit.vue'
import ImageModalDelete from './ImageModalDelete.vue'

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
    showTag (name) {
      this.$router.push(`/tag/${name}`)
    },
    edit () {
      this.showEditModal = true
    },
    remove () {
      this.showDeleteModal = true
    },
    updated () {
      this.$emit('updated')
    },
    deleted () {
      this.$emit('deleted')
    }
  },
}
</script>