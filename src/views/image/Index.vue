<template>
  <div class="container-fluid p-6">
    <image-table :tag-filter="$route.params.name" />
  </div>
</template>

<script>
import ImageTable from './components/ImageTable.vue'

export default {
  name: 'Home',
  components: { ImageTable },
}
</script>
