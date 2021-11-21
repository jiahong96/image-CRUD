<template>
  <div
    class="card image-card border-0"
  >
    <div class="row g-0">
      <div
        class="col-md-4 text-center text-md-start"
      >
        <img
          class="contain rounded-3"
          :src="`${$http.defaults.baseURL}${imageUrl}`"
          alt=""
          width="75"
          height="75"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body py-0 text-center text-md-start">
          <h6 class="card-title fw-bolder mb-1 text-truncate">
            {{ title }}
          </h6>
          <p class="card-text">
            <small class="text-black">{{ `${fileSize}MB` }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  },
}
</script>

<style>
.image-card {
  width: 250px;
}
</style>