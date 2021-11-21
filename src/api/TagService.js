import Vue from 'vue'

const resource = 'tags'

export default {
  list (q = '') {
    return Vue.prototype.$http.get(`/api/v1/${resource}?q=${q}`)
  }
}