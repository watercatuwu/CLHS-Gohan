<template>
  <div class="btm-nav md:hidden">
    <RouterLink to="/home" @click="active=0" class="z-10 transition transform ease-in-out duration-300 scale-100 md:hover:z-10 md:hover:scale-105 md:hover:bg-base-200 active:scale-90" :class="{ active: active===0 }">
      <homeicon />
    </RouterLink>
    <RouterLink to="/shop" @click="active=1" class="z-10 transition transform ease-in-out duration-300 scale-100 md:hover:z-10 md:hover:scale-105 md:hover:bg-base-200 active:scale-90" :class="{ active: active===1 }">
      <storeicon />
    </RouterLink>
    <RouterLink to="/order" @click="active=2" class="transition transform ease-in-out duration-300 scale-100 md:hover:z-10 md:hover:scale-105 md:hover:bg-base-200 active:scale-90" :class="{ active: active===2 }">
      <receipticon />
    </RouterLink>
    <RouterLink to="/profile" @click="active=3" class="transition transform ease-in-out duration-300 scale-100 md:hover:z-10 md:hover:scale-105 md:hover:bg-base-200 active:scale-90" :class="{ active: active===3 }">
      <div v-if="avatarUrl===null">
        <usericon />
      </div>
      <div v-else class="avatar">
        <div class="rounded-full" :class="{'w-7':!isRing,'w-6': isRing,'ring-primary': isRing,'ring-offset-base-100': isRing,'ring-2': isRing,'ring-offset-2': isRing,}">
          <img :src="avatarUrl" />
        </div>
      </div>
    </RouterLink>
  </div>
  <div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content p-2 fixed top-0 left-0 hidden md:block">
    <label for="my-drawer" class="btn btn-lg bg-opacity-0 border-0 drawer-button"><baricon /></label>
  </div>
  <div class="drawer-side z-50">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li>
      <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="flex flex-row gap-5">
          <div v-if="avatarUrl!==null" class="avatar">
            <div class="w-12 rounded-full">
              <img :src="avatarUrl" />
            </div>
          </div>
          <div v-else class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-12 rounded-full">
              <span class="text-3xl">:D</span>
            </div>
          </div>
          <h2 class="card-title text-xl">{{userData.auth.user_metadata.name}}</h2>
        </div>
      </div>
      </li>
      <li class="transition transform ease-in=-out duration-300 scale-100 hover:scale-105 active:scale-100">
        <RouterLink to="/home">
          <homeicon />主頁
        </RouterLink>
      </li>
      <li class="transition transform ease-in=-out duration-300 scale-100 hover:scale-105 active:scale-100">
        <RouterLink to="/shop">
          <storeicon />商店
        </RouterLink>
      </li>
      <li class="transition transform ease-in=-out duration-300 scale-100 hover:scale-105 active:scale-100">
        <RouterLink to="/order">
          <receipticon />訂單
        </RouterLink>
      </li>
      <li class="transition transform ease-in=-out duration-300 scale-100 hover:scale-105 active:scale-100">
        <RouterLink to="/profile">
          <usericon />個人資料
        </RouterLink>
      </li>
    </ul>
  </div>
</div>
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'
import receipticon from '@/assets/icons/receipt.svg'
import baricon from '@/assets/icons/bar.svg'

import { ref,onMounted,watch } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { useRoute } from 'vue-router';

const currentURL = window.location.href;
const url = new URL(currentURL);
const currentPath = url.pathname;
const PATHS = ['/home', '/shop', '/order', '/profile'];
const active = ref(PATHS.indexOf(currentPath));
const userData = JSON.parse(sessionStorage.getItem('userData'))

const route = useRoute();
const isRing = ref(false);

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
</script>