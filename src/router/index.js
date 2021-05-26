import { createRouter, createWebHistory } from 'vue-router'
import Exchange from '../views/Exchange.vue'

const routes = [
  {
    path: '/',
    name: 'Exchange',
    component: Exchange
  },
  {
    path: '/liquidity',
    name: 'Liquidity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Liquidity.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
