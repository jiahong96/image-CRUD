import Vue from 'vue'

const resource = 'images'

export default {
  list (q = '', tagged = '') {
    return Vue.prototype.$http.get(`/api/v1/${resource}?q=${q}&tagged=${tagged}`)
  },
  create (data) {
    return Vue.prototype.$http.request({
      url: `/api/v1/${resource}`,
      method: 'post',
      data,
      config: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    })
  },
  update (id, data) {
    return Vue.prototype.$http.request({
      url: `/api/v1/${resource}/${id}`,
      method: 'patch',
      data,
      config: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    })
  },
  show (id) {
    return Vue.prototype.$http.get(`/api/v1/${resource}/${id}`)
  },
  delete (id) {
    return Vue.prototype.$http.delete(`/api/v1/${resource}/${id}`)
  },
}