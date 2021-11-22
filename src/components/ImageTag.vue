<template>
  <span class="badge bg-light text-dark me-2">{{ text }}</span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
  },
}
</script>