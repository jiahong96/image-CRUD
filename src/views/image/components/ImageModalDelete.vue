<template>
  <div
    :id="modalId"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content py-4 px-3 px-lg-5">
        <div class="modal-header justify-content-center border-0">
          <h2 class="modal-title fw-bolder">
            Delete Image
          </h2>
        </div>

        <div class="modal-body row">
          <!-- Modal description -->
          <div class="col-12 mb-4">
            <p>Delete <strong>{{ imageName }}</strong> ?</p>
          </div>
          
          <!-- Modal actions -->
          <div class="col-12 text-end">
            <button
              type="button"
              class="btn btn-secondary"
              :disabled="isDeleting"
              @click="hideModal"
            >
              Cancel
            </button>
            <button
              class="btn btn-danger mx-2"
              :disabled="isDeleting"
              @click="remove"
            >
              {{ buttonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageService from '@/api/ImageService'
import { Modal } from 'bootstrap'

export default {
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
      buttonTitle: 'Delete',
      modalId: 'deleteModal',
      modalOptions: {
        keyboard: false
      },
      isDeleting: false,
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
    async remove () {
      this.isDeleting = true

      try {
        await ImageService.delete(this.imageId)
        this.imageDeleted()
      } catch (error) {
        console.log(error)
      }

      this.isDeleting = false
    },
    imageDeleted () {
      this.$emit('deleted')
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

      document.getElementById(this.modalId).addEventListener('hidden.bs.modal', () => {
        this.$emit('update:isVisible', false)
      })
    },
  },
}
</script>