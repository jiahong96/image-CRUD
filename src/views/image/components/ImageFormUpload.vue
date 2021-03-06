<template>
  <form
    enctype="multipart/form-data"
    class="row"
  >
    <div class="col-12 mb-4">
      <label
        for="name"
        class="form-label"
      >{{ nameLabel }}</label>
      <input
        id="name"
        v-model="name"
        :name="titleFieldName"
        type="text"
        :class="nameClass"
        :placeholder="namePlaceholder"
      >
      <div class="invalid-feedback">
        {{ nameInvalidText }}
      </div>
    </div>

    <!-- Image Dropbox -->
    <div class="col-12 mb-4">
      <label
        for="file"
        class="form-label"
      >{{ fileLabel }}</label>
      <div class="dropbox">
        <input
          id="file"
          type="file"
          :name="fileFieldName"
          :disabled="isUploading"
          accept="image/*"
          class="input-file"
          @change="fileChange($event.target.files)"
        >
        <div
          class="box-container d-flex flex-column flex-lg-row justify-content-center align-items-center"
        >
          <p
            v-if="!image"
            class="fs-5 text-center text-lg-start mb-0 me-4"
          >
            Drop an image here or
            <br> <span class="text-decoration-underline">Browse from your computer</span>
          </p>          
            
          <font-awesome-icon
            v-if="!image"
            :icon="['fas', 'image']"
            size="5x"
            :style="{ color: 'rgba(51, 51, 51, 0.15)' }"
          />

          <p
            v-if="image"
            class="fs-5 text-center"
          >
            {{ isUploading ? 'Uploading...' : image.name }}
          </p>
        </div>                  
      </div>
      <div
        v-show="fileInvalid"
        class="text-danger"
      >
        <small>{{ fileInvalidText }}</small>
      </div>
    </div>

    <div class="col-12 text-end">
      <button
        class="btn btn-primary"
        :disabled="isUploading"
        @click.stop.prevent="submit"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    nameValue: {
      type: String,
      default: null
    },
    isUploading: {
      type: Boolean,
      default: false
    },
    buttonTitle: {
      type: String,
      default: 'Upload'
    },
    fileFieldName: {
      type: String,
      required: true
    },
    titleFieldName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      image: null,
      fileLabel: 'Image',
      fileInvalid: false,
      fileInvalidText: 'Image is required.',
      name: null,
      nameLabel: 'Title',
      nameBlur: false,
      nameInvalidText: 'Valid Title is required.',
      namePlaceholder: 'Sydney Opera House',
    }
  },
  computed: {
    nameClass () {
      return {
        'is-invalid': !this.validName(this.name) && this.nameBlur,
        'form-control': true,
      }
    },
  },
  watch: {
    isShown (newValue) {
      if(newValue && this.nameValue) this.name = this.nameValue

      if(!newValue) this.reset()
    },
  },
  methods: {
    submit () {
      if(!this.validateAll()) return
      
      this.$emit('submit', {file: this.image, name: this.name})
    },
    validateAll () {
      this.blurInputs()
      
      const validFile = this.validFile(this.image)
      return this.validName(this.name) && validFile
    },
    blurInputs () {
      this.nameBlur = true
    },
    validName (name) {
      return !!name
    },
    validFile (file) {
      const valid = !!file
      if(!valid) this.fileInvalid = true
      return valid
    },
    fileChange (file) {
      if (!file) return;
      this.image = file[0]     
      this.fileInvalid = false
    },
    reset () {
      this.image = null
      this.name = null
      this.fileInvalid = false
      this.nameBlur = false
    }
  },
}
</script>

<style lang="scss" scoped>
$boxHeight: 200px;
$normalTransparency: 0.5;
$hoverTransparency: 0.8;
$boxBg: #F9F9F9;

.dropbox {
  outline: 2px dashed rgba(51, 51, 51, $normalTransparency); /* the dash box */
  outline-offset: -16px;
  border-radius: .5rem;
  background: rgba($boxBg, $normalTransparency);
  padding: 16px;
  min-height: $boxHeight;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: $boxHeight;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba($boxBg, $hoverTransparency);
}

.box-container {
  height: $boxHeight;
}
</style>