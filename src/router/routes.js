export default [
  { // catch-all route (404 not found)
    path: '*',
    redirect: {
      path: '/',
    },
  },
  {
    path: '',
    component: () => import('@/layouts/base'),
    children: [
      {
        path: '/',
        name: 'Home',
        // lazy loading routes (https://router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes)
        // this generates a separate chunk (home.[hash].js) for this route
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ],
  },  
]