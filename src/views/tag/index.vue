<template>
  <div class="container-fluid p-3 p-md-6">
    <tag-table />
  </div>
</template>

<script>
import TagTable from './components/TagTable.vue'
export default {
  name: 'TagIndex',
  components: { TagTable },
}
</script>