<template>
  <button
    class="btn btn-sm btn-light rounded-circle"
    @click="$emit('click')"
  >
    <font-awesome-icon :icon="['fas', 'plus']" />
  </button>
</template>

<style scoped>
button.btn.btn-light { 
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}
</style>