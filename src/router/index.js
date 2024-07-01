import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/captains',
      name: 'Captains',
      component: () => import('@/views/ShowCaptains.vue')
    },
    {
      path: '/items',
      name: 'Items',
      component: () => import('@/views/ShowItems.vue')
    },
    {
      path: '/apis/captains',
      name: 'ApisCaptains',
      component: () => import('@/views/apis/ApisCaptains.vue')
    },
    {
      path: '/apis/listings',
      name: 'ApisListings',
      component: () => import('@/views/apis/ApisListings.vue')
    },
    {
      path: '/db/captains',
      name: 'DbCaptains',
      component: () => import('@/views/db/DbCaptains.vue')
    },
    {
      path: '/db/listings',
      name: 'DbListings',
      component: () => import('@/views/db/DbListings.vue')
    }
  ]
})

export default router
