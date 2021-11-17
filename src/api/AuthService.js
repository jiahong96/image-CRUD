import Vue from 'vue'

export default {
  login({ username, password }) {
    return Vue.prototype.$http.post(`/v1/login`, { user: { email:username, password } })
  }
}