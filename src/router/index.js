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
    component: () => import('../views/Liquidity.vue')
  },
  {
    path: '/farm',
    name: 'Farm',
    component: () => import('../views/Farm.vue')
  },
  {
    path: '/pairs',
    name: 'Pairs',
    component: () => import('../views/Pairs.vue')
  },
  {
    path: '/tokens',
    name: 'Tokens',
    component: () => import('../views/Tokens.vue')
  },
  {
    path: '/migrate',
    name: 'Migrate',
    component: () => import('../views/Migrate.vue')
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
