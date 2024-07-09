import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'Captains' },
    },
    {
      path: '/captains',
      name: 'Captains',
      component: () => import('@/views/ShowCaptains.vue'),
    },
    {
      path: '/items',
      name: 'Items',
      component: () => import('@/views/ShowItems.vue'),
    },
    {
      path: '/supercharge',
      name: 'Supercharge',
      component: () => import('@/views/ShowSupercharge.vue'),
    },
    ,
    {
      path: '/Apis',
      name: 'Apis',
      component: () => import('@/views/ShowApis.vue'),
    },
  ],
})

export default router
