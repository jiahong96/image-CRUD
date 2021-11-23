<template>
  <div>
    <!-- Modal Activator -->
    <div @click="showModal">
      <slot name="activator" />
    </div>

    <!-- Modal -->
    <div
      id="editModal"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content py-4 px-5">
          <div class="modal-header justify-content-center border-0">
            <h2 class="modal-title fw-bolder">
              Edit Image
            </h2>
          </div>

          <div class="modal-body">
            <image-form-upload
              :name-value="name"
              :is-uploading="isEditing"
              :title-field-name="titleFieldName"
              :file-field-name="fileFieldName"
              button-title="Edit"
              @submit="edit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from 'form-data'
import { Modal } from 'bootstrap'
import ImageService from '@/api/ImageService'
import ImageFormUpload from './ImageFormUpload.vue'

export default {
  components: {
    ImageFormUpload,
  },
  data() {
    return {
      modal: null,
      modalId: 'editModal',
      modalOptions: {
        keyboard: false
      },
      isEditing: false,
      imageId: null,
      name: null,
      titleFieldName: 'name',
      fileFieldName: 'image',
    }
  },
  mounted () {
    this.initModal()    
  },
  methods: {
    async edit ({file, name}) {
      this.isEditing = true
      const formData = new FormData();

      // append the file and name to FormData
      formData.append(`${this.fileFieldName}[${this.fileFieldName}]`, file, file.name)
      formData.append(`${this.fileFieldName}[${this.titleFieldName}]`, name)

      try {
        await ImageService.update(this.imageId, formData)
        this.imageUpdated()
      } catch (error) {
        console.log(error)
      }

      this.isEditing = false
    },
    imageUpdated () {
      this.$emit('updated')
      this.hideModal()
    },
    initModal () {
      this.modal = new Modal(document.getElementById(this.modalId), this.modalOptions)
    },
    hideModal () {
      this.modal.hide()
    },
    showModal (id = null, name = null) {
      // access via refs in parent. In some cases <slot> can't be utilized
      this.imageId = id
      this.name = name

      this.modal.show()
    },    
  },
}
</script>