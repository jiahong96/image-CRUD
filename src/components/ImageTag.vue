<template>
  <span class="badge bg-light text-dark mx-0.5">{{ text }}</span>
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