<template>
  <div class="container-fluid py-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8 col-xl-6">
        <login-form />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
export default {
  components: { LoginForm }  
}
</script>