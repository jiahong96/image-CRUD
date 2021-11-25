import Vue from 'vue'
import store from '@/store'
import router from '@/router'

Vue.prototype.$http.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    store.dispatch('auth/logout')
    if(router.currentRoute.path !== '/login') router.push({ path: '/login' })
  } 

  return Promise.reject(error)
})