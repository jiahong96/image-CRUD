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
        class="form-control"
        :placeholder="namePlaceholder"
      >
    </div>

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
          class="box-container d-flex justify-content-center align-items-center"
        >
          <p
            v-if="!image"
            class="fs-5 text-start mb-0 me-4"
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
            {{ image.name }}
          </p>
        </div>                  
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
      name: null,
      image: null,
      nameLabel: 'Title',
      fileLabel: 'Image',
      namePlaceholder: 'Sydney Opera House',
    }
  },
  methods: {
    submit () {
      this.$emit('submit', {file: this.image, name: this.name})
    },
    fileChange (file) {
      if (!file) return;
      this.image = file[0]     
    },
  },
}
</script>

<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed rgba(51, 51, 51, 0.5); /* the dash box */
  outline-offset: -16px;
  border-radius: .5rem;
  background: rgba(249, 249, 249, 0.5);
  padding: 16px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(249, 249, 249, 0.8);
}

.box-container {
  height: 200px;
}
</style>