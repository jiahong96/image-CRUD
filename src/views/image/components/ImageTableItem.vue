<template>
  <div class="row gy-3">
    <div
      class="col-lg-4 text-center text-lg-end"
    >
      <img
        class="contain"
        :src="`${$http.defaults.baseURL}${imageUrl}`"
        alt=""
        width="75"
        height="75"
      >
    </div>
    <div class="col-lg-8 text-center text-lg-start">
      <h5 class="fw-bolder mb-1 text-truncate">
        {{ title }}
      </h5>
      <p class="card-text">
        <small>{{ $bytesToSize(fileSize) }}</small>
      </p>
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