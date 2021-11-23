<template>
  <div>
    <!-- Button trigger modal -->
    <plus-button @click="showModal" />

    <!-- Modal -->
    <div
      id="uploadModal"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content py-4 px-5">
          <div class="modal-header justify-content-center border-0">
            <h2 class="modal-title fw-bolder">
              Upload Image
            </h2>
          </div>

          <div class="modal-body">
            <image-form-upload
              :is-uploading="isUploading"
              :title-field-name="titleFieldName"
              :file-field-name="fileFieldName"
              @submit="save"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from 'form-data'
import PlusButton from '@/components/PlusButton.vue'
import { Modal } from 'bootstrap'
import ImageService from '@/api/ImageService'
import ImageFormUpload from './ImageFormUpload.vue'

export default {
  components: {
    PlusButton,
    ImageFormUpload
  },
  data () {
    return {
      modal: null,
      modalId: 'uploadModal',
      modalOptions: {
        keyboard: false
      },
      isUploading: false,
      titleFieldName: 'name',
      fileFieldName: 'image',
    }
  },
  mounted () {
    this.initModal()
  },
  methods: {
    async save ({file, name}) {
      this.isUploading = true
      const formData = new FormData();

      // append the file and name to FormData
      formData.append(`${this.fileFieldName}[${this.fileFieldName}]`, file, file.name)
      formData.append(`${this.fileFieldName}[${this.titleFieldName}]`, name)

      try {
        await ImageService.create(formData)
        this.imageUploaded()
      } catch (error) {
        console.log(error)
      }

      this.isUploading = false
    },
    imageUploaded () {
      this.$emit('created')
      this.hideModal()
    },
    initModal () {
      this.modal = new Modal(document.getElementById(this.modalId), this.modalOptions)
    },
    hideModal () {
      this.modal.hide()
    },
    showModal () {
      this.modal.show()
    },    
  },
}
</script>