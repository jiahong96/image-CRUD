<template>
  <span
    class="badge text-primary fs-6"
    @click="$emit('click', text)"
  >{{ text }}</span>
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

<style scoped>
.badge {
  background-color: #F3F4F6;
  font-weight: 600;
  cursor: pointer;
  pointer-events: auto;
}
</style>