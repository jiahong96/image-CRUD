<template>
  <button
    class="btn btn-light"
    @click="$emit('click')"
  >
    <font-awesome-icon :icon="['fas', 'search']" />
  </button>
</template>

<style scoped>
button.btn.btn-light { 
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
}
</style>