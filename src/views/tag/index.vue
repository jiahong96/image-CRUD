<template>
  <div class="container-fluid p-6">
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