<template>
  <span
    class="badge text-primary fs-6"
    @click="onClick"
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
  methods: {
    onClick () {
      this.$emit('click', this.text)
    }
  },
}
</script>

<style scoped>
.badge {
  background-color: #F3F4F6;
  font-weight: 600;
}
</style>