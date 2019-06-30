import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition && window.innerWidth > 991) {
          return savedPosition
      } else {
          return { x: 0, y: 0 }
      }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/if',
      name: 'if',
      component: () => import('./views/If.vue')
    },
    {
      path: '/while',
      name: 'while',
      component: () => import('./views/While.vue')
    },
    {
      path: '/do-while',
      name: 'do-while',
      component: () => import('./views/DoWhile.vue')
    },
    {
      path: '/array',
      name: 'array',
      component: () => import('./views/Array.vue')
    },
    {
      path: '/for',
      name: 'for',
      component: () => import('./views/For.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Map.vue')
    },
    {
      path: '/foreach',
      name: 'foreach',
      component: () => import('./views/Foreach.vue')
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('./views/Impressum.vue')
    }
  ]
})
