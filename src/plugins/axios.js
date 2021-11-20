import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.prototype.$http = axios

const token = localStorage.getItem('jwt_token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}