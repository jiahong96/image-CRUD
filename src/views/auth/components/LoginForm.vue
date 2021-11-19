<template>
  <div class="card shadow-sm rounded-3 pt-4">
    <div class="card-body">
      <h2 class="card-title fw-bolder text-center mb-5">
        {{ title }}
      </h2>

      <form class="row px-3 px-md-5">
        <div class="col-12 mb-4">
          <label
            for="emailInput"
            class="form-label"
          >{{ emailLabel }}</label>
          <input
            id="emailInput"
            type="email"
            class="form-control form-control-lg shadow-sm"
            :placeholder="emailPlaceholder"
          >
        </div>
        <div class="col-12 mb-5">
          <label
            for="passwordInput"
            class="form-label"
          >{{ passwordLabel }}</label>
          <input
            id="passwordInput"
            type="password"
            class="form-control form-control-lg shadow-sm"
          >
        </div>   

        <div class="col-12 text-end">
          <button
            type="button"
            class="btn btn-primary"
          >
            {{ buttonText }}
          </button>
        </div>     
      </form>      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Sign in to BowerBird',
      buttonText: 'Sign In',
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
    }
  },
}
</script>