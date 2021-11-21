import Vue from 'vue'

export default {
  login({ username, password }) {
    return Vue.prototype.$http.post(`/api/v1/login`, { user: { email:username, password } })
  }
}