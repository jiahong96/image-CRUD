<template>
  <div class="card card-shadow px-1 py-5 p-md-6">
    <div class="card-body py-0">
      <!-- form title -->
      <h2 class="card-title fw-bolder text-center mb-5">
        {{ title }}
      </h2>

      <!-- form body -->
      <form class="row px-2">
        <div class="px-2.5">
          <div
            v-if="error"
            class="alert alert-danger"
            role="alert"
          >
            {{ errorMessage }}
          </div>
        </div>

        <div class="col-12 mb-4">
          <label
            for="emailInput"
            class="form-label"
          >{{ emailLabel }}</label>
          <input
            id="emailInput"
            v-model="email"
            type="email"
            :class="emailClass"
            :placeholder="emailPlaceholder"
            @focus="clearError"
          >
          <div class="invalid-feedback">
            {{ emailInvalidText }}
          </div>
        </div>
        <div class="col-12 mb-5">
          <label
            for="passwordInput"
            class="form-label"
          >{{ passwordLabel }}</label>
          <input
            id="passwordInput"
            v-model="password"
            type="password"
            :class="passwordClass"
            @focus="clearError"
          >
          <div class="invalid-feedback">
            {{ passwordInvalidText }}
          </div>
        </div>   

        <!-- form submit button -->
        <div class="col-12 text-end">
          <button
            class="btn btn-primary"
            :disabled="progressing"
            @click.stop.prevent="submit"
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
  data () {
    return {
      title: 'Sign in to BowerBird',
      progressing: false,
      buttonText: 'Sign In',
      error: false,
      errorMessage: '',
      email: null,
      emailBlur: false,
      emailLabel: 'Email',
      emailPlaceholder: 'john@bowerbird.io',
      emailInvalidText: 'Valid Email is required.',
      password: null,
      passwordBlur: false,
      passwordLabel: 'Password',
      passwordInvalidText: 'Password is required.'
    }
  },
  computed: {
    emailClass () {
      return {
        'is-invalid': !this.validEmail(this.email) && this.emailBlur,
        'form-control': true,
        'form-control-lg': true,
      }
    },
    passwordClass () {
      return {
        'is-invalid': !this.validPassword(this.password) && this.passwordBlur,
        'form-control': true,
        'form-control-lg': true,
      }
    },
  },
  methods: {
    submit () {
      if(!this.validateAll()) return

      this.login()
    },
    validateAll () {
      this.blurInputs()

      return this.validEmail(this.email) && this.validPassword(this.password)
    },
    blurInputs () {
      this.emailBlur = true
      this.passwordBlur = true
    }, 
    validEmail (email) {      
      return !!email && /.+@.+/.test(email)
    },
    validPassword (password) {
      return !!password
    },
    async login () {
      this.progressing = true

      try {
        await this.dispatchLogin()
        this.goToHome()
      } catch (error) {        
        this.handleHttpError(error)
      }

      this.progressing = false 
    },
    dispatchLogin () {
      return this.$store.dispatch('auth/login', {
        email: this.email, 
        password: this.password
      })
    },
    goToHome () {
      this.$router.push({ path: 'home' })
    },
    handleHttpError (error) {
      this.error = true
      this.errorMessage = error.response?.['data']?.['message'] || 'Failed to login'
    },
    clearError () {
      this.error = false
      this.errorMessage = ''
    },       
  },
}
</script>