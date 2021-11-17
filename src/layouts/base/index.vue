<template>
  <div>
    <app-bar />
    <base-view />
  </div>
</template>

<script>
export default {
  components: { 
    AppBar: () => import('./AppBar.vue'), 
    BaseView: () => import('./View.vue'), 
  },
}
</script>