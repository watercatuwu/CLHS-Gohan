<template>
  <div v-if="userData" class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start">
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button"><icon name="bar"></icon></label>
        </div>
        <div class="drawer-side z-50">
          <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-2">
            <RouterLink to="/profile">
            <li>
            <div class="card">
              <div class="flex flex-row gap-5">
                <div v-if="avatarUrl!==null" class="avatar">
                  <div class="w-12 rounded-full">
                    <img :src="avatarUrl" />
                  </div>
                </div>
                <div v-else class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content w-12 rounded-full">
                    <span class="text-xl">{{userData.auth.user_metadata.name.slice(-1)}}</span>
                  </div>
                </div>
                <h2 class="card-title text-xl">{{userData.auth.user_metadata.name}}</h2>
              </div>
            </div>
            </li>
            </RouterLink>
            <li v-for="link in links" class="transition transform ease-in-out duration-300 scale-100 hover:scale-105 active:scale-100">
              <RouterLink :to="link.path" :class="{'bg-primary': link.path === currentPath, 'text-primary-content': link.path === currentPath}">
                <icon :name="link.icon" />
                <span>{{link.name}}</span>
              </RouterLink>
            </li>
          </ul>
          <div class="fixed bottom-0 p-4 w-80">
            <advertisement image="https://files.catbox.moe/9tc8px.webp" title="廣告" content="Put Your Logo Here." link="https://youtu.be/BbeeuzU5Qc8" />
          </div>
        </div>
    </div>
  </div>
  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div v-if="avatarUrl!==null" class="avatar">
          <div class="w-10 rounded-full">
            <img :src="avatarUrl" />
          </div>
        </div>
        <div v-else class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-12 rounded-full">
            <span class="text-lg">{{userData.auth.user_metadata.name.slice(-1)}}</span>
          </div>
        </div>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-300 rounded-box w-52 z-50">
          <li>
            <RouterLink to="/profile">
            Profile
            </RouterLink>
          </li>
        <li><a class="bg-error" @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup>
import icon from '@/components/widgets/icon.vue'
import advertisement from '@/components/widgets/advertisement.vue'

import { supabase } from '@/supabase'
import { ref,onMounted,watch,defineAsyncComponent } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter()

const route = useRoute();
const currentPath = ref(route.path);
const userData = JSON.parse(sessionStorage.getItem('userData'))

const isRing = ref(false);

const links = [
  { name: '主頁', path: '/home', icon: 'home' },
  { name: '商店', path: '/shop', icon: 'store' },
  { name: '訂單', path: '/order', icon: 'receipt' },
  { name: '個人資料', path: '/profile', icon: 'user' },
  { name: '統計資料', path: '/manage', icon: 'chart' },
]

watch(() => route.path,(newRoutePath) => {
  console.log(newRoutePath)
  currentPath.value = newRoutePath
});

const avatarUrl = ref('');
onMounted(async () => {
  avatarUrl.value = await getUserAvatar();
})

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  sessionStorage.clear()
  router.push('/')
  if (error) {
    console.log(error)
  }
};
</script>