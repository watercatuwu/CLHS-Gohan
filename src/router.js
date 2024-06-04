import { createWebHistory, createRouter } from 'vue-router'

import index from '@/components/pages/index.vue'
import home from '@/components/pages/home.vue'
import shop from '@/components/pages/shop.vue'
import profile from '@/components/pages/profile.vue'
import login from '@/components/pages/login.vue'

const routes = [
  { path: '/', component: index },
  { path: '/home', component: home, meta: { requiresAuth: true } },
  { path: '/shop', component: shop, meta: { requiresAuth: true } },
  { path: '/profile', component: profile, meta: { requiresAuth: true } },
  { path: '/login', component: login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  if (to.meta.requiresAuth && !currentUser) {
    return {
      path: '/login',
    }
  }
})

export default router