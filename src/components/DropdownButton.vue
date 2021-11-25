<template>
  <div>
    <button
      class="btn btn-light dropdown-toggle dropdown-el"
      type="button"
      data-bs-toggle="dropdown"
    >
      <span class="me-2">{{ title }}</span>
      <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
    </button>
    <ul
      class="dropdown-menu rounded-3 dropdown-el"
    >
      <slot name="item" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true 
    },
  },
}
</script>

<style scoped>
.dropdown-el {
  min-width: 110px;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-item {
  color: #000;
}
</style>