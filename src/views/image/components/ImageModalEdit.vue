<template>
  <div
    :id="modalId"
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
            :is-shown="modalShown"
            :name-value="imageName"
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
  props: {
    imageId: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      theModal: null,
      modalShown: false,
      modalId: 'editModal',
      modalOptions: {
        keyboard: false
      },
      isEditing: false,
      titleFieldName: 'name',
      fileFieldName: 'image',
    }
  },
  watch: {
    isVisible (newValue) {
      if(newValue) this.showModal()
    }
  },
  mounted () {
    this.initModal()    
  },
  methods: {
    async edit ({file, name}) {
      this.isEditing = true

      try {
        await ImageService.update(this.imageId, this.imageFormData(file, name))
        this.imageUpdated()
      } catch (error) {
        console.log(error)
      }

      this.isEditing = false
    },
    imageFormData (file, name) {
      const formData = new FormData();

      // append the file and name to FormData
      formData.append(`${this.fileFieldName}[${this.fileFieldName}]`, file, file.name)
      formData.append(`${this.fileFieldName}[${this.titleFieldName}]`, name)

      return formData
    },
    imageUpdated () {
      this.$emit('updated')
      this.hideModal()
    },
    hideModal () {
      this.theModal.hide()
    },
    showModal () {
      this.theModal.show()
    },
    initModal () {
      this.theModal = new Modal(document.getElementById(this.modalId), this.modalOptions)

      // listen to show/hide events
      document.getElementById(this.modalId).addEventListener('show.bs.modal', () => {
        this.modalShown = true
      })
      document.getElementById(this.modalId).addEventListener('hidden.bs.modal', () => {
        this.modalShown = false
        this.$emit('update:isVisible', false)
      })
    },    
  },
}
</script>