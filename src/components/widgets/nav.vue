<template>
  <div class="navbar bg-base-100 sticky top-0 z-50">
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
              <RouterLink :to="link.path">
                <icon :name="link.icon" />
                <span>{{link.name}}</span>
              </RouterLink>
            </li>
          </ul>
          <div class="fixed bottom-0 p-4 w-80">
            <div class="card bg-base-300 shadow-md">
              <div class="card-body">
                <div class="flex justify-between items-center gap-2">
                  <div class="flex items-center">
                    <icon name="heart" />
                    <h2 class="card-title">廣告位</h2>
                  </div>
                  <span class="badge badge-secondary">AD</span>
                </div>
                <p>Lorem ipsum</p>
              </div>
            </div>
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
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
        <RouterLink to="/profile">
          <li>
            Profile
          </li>
        </RouterLink>
        <li><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup>
import icon from '@/components/widgets/icon.vue'

import { supabase } from '@/supabase'
import { ref,onMounted,watch,defineAsyncComponent } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter()

const currentURL = window.location.href;
const url = new URL(currentURL);
const currentPath = url.pathname;
const PATHS = ['/home', '/shop', '/order', '/profile'];
const active = ref(PATHS.indexOf(currentPath));
const userData = JSON.parse(sessionStorage.getItem('userData'))

const route = useRoute();
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
  if(newRoutePath==='/profile') {
    isRing.value = true;
  } else{
    isRing.value = false;
  }
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