import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Sample from '../views/Sample.vue'

// import { AuthProvider } from '@/core/providers'
import SampleCreate from '../views/page-fragment/SampleCreate.vue'
import SampleList from '../views/page-fragment/SampleList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/sample',
    name: 'Sample',
    component: Sample,
    children: [
      {
        path: '/',
        name: 'Sample List',
        component: SampleList
      },
      {
        path: '/',
        name: 'Create Sample',
        component: SampleCreate
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, _, next) => {
//   const publicPages = ['/login', '/register']
//   const required = !publicPages.includes(to.path)
//   const isLogged = AuthProvider.isLogged()

//   if (required && isLogged) {
//     return next('/login')
//   }
// })

export default router
