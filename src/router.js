import { createWebHistory, createRouter } from 'vue-router'
import { supabase } from '@/supabase'

import index from '@/components/pages/index.vue'
import home from '@/components/pages/home.vue'
import shop from '@/components/pages/shop.vue'
import order from '@/components/pages/order.vue'
import profile from '@/components/pages/profile.vue'
import manage from './components/pages/manage.vue'
import NotFound from '@/components/pages/404.vue'

const routes = [
  { path: '/', name: 'index', component: index, meta: { title:'CLHS Gohan | 非官方中大壢中熱食部點餐系統', navbar: false } },
  { path: '/home', name: 'home', component: home, meta: { title: '主頁 | CLHS Gohan', requiresAuth: true, navbar: true } },
  { path: '/shop', name: 'shop', component: shop, meta: { title: '商店 | CLHS Gohan', requiresAuth: true, navbar: true } },
  { path: '/order', name: 'order', component: order, meta: { title: '訂單 | CLHS Gohan', requiresAuth: true, navbar: true } },
  { path: '/profile', name: 'profile', component: profile, meta: { title: '個人檔案 | CLHS Gohan', requiresAuth: true, navbar: true } },
  { path: '/manage', name: 'manage', component: manage, meta: { title: '管理 | CLHS Gohan', requiresAuth: true, navbar: true } },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound, meta: { title: '404 | CLHS Gohan', requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to, from) => {
  document.title = to.meta.title
  const {data:{user}} = await supabase.auth.getUser()
  if (to.meta.requiresAuth && !user) {
    return {
      path: '/',
    }
  }
})

export default router