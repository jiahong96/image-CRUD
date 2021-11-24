<template>
  <div class="row">
    <div
      class="col-md-3 text-center text-md-end"
    >
      <img
        class="contain"
        :src="`${$http.defaults.baseURL}${imageUrl}`"
        alt=""
        width="75"
        height="75"
      >
    </div>
    <div class="col-md-9 text-center text-md-start">
      <h5 class="fw-bolder mb-1 text-truncate">
        {{ title }}
      </h5>
      <p class="card-text">
        <small class="text-black">{{ $bytesToSize(fileSize) }}</small>
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