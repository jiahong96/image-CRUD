export default [
  { // catch-all route (404 not found)
    path: '*',
    redirect: {
      path: '/',
    },
  },
  { // default route
    path: '/',
    redirect: {
      path: '/home',
    },
  },
  {
    path: '',
    component: () => import('@/layouts/base'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login')
      },
      {
        path: '/home',
        name: 'Home',
        // lazy loading routes (https://router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes)
        // this generates a separate chunk (home.[hash].js) for this route
        component: () => import(/* webpackChunkName: "home" */ '@/views/image/Index.vue'),
      },
      {
        path: '/image/:id',
        name: 'ImageShow',
        component: () => import(/* webpackChunkName: "imageshow" */ '@/views/image/Show.vue'),
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import(/* webpackChunkName: "tag" */ '@/views/tag/Index.vue'),
      },
      {
        path: '/tag/:name',
        name: 'TagShow',
        component: () => import(/* webpackChunkName: "tagshow" */ '@/views/image/Index.vue'),
      },
    ],
  },  
]