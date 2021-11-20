import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const isAuthenticated = !!store.getters['auth/authorized']

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })

  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })

  else next()
})

export default router
