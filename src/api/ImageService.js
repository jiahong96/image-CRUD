import Vue from 'vue'

const resource = 'images'

export default {
  list (q = '', tagged = '') {
    return Vue.prototype.$http.get(`/api/v1/${resource}?q=${q}&tagged=${tagged}`)
  }
}