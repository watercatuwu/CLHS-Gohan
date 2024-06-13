import { createWebHistory, createRouter } from 'vue-router'

import index from '@/components/pages/index.vue'
import home from '@/components/pages/home.vue'
import shop from '@/components/pages/shop.vue'
import profile from '@/components/pages/profile.vue'
import manage from './components/pages/manage.vue'
import NotFound from '@/components/pages/404.vue'

const routes = [
  { path: '/', name: 'index', component: index },
  { path: '/home', name: 'home', component: home, meta: { requiresAuth: true } },
  { path: '/shop', name: 'shop', component: shop, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: profile, meta: { requiresAuth: true } },
  { path: '/manage', name: 'manage', component: manage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  if (to.meta.requiresAuth && !currentUser) {
    return {
      path: '/',
    }
  }
})

export default router