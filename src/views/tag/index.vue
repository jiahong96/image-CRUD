<template>
  <div class="container-fluid py-5 px-3 p-md-5">
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