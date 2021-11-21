<template>
  <div class="container-fluid py-5 px-3 p-md-5">
    <image-table />
  </div>
</template>

<script>
import ImageTable from './components/ImageTable.vue'

export default {
  name: 'Home',
  components: { ImageTable },
}
</script>
