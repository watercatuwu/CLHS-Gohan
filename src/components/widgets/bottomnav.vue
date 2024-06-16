<template>
  <div class="btm-nav">
    <RouterLink to="/home" @click="active=0" :class="{ active: active===0 }">
      <homeicon />
      <span class="btm-nav-label text-sm">主頁</span>
    </RouterLink>
    <RouterLink to="/shop" @click="active=1" :class="{ active: active===1 }">
      <storeicon />
      <span class="btm-nav-label text-sm">商店</span>
    </RouterLink>
    <RouterLink to="/order" @click="active=2" :class="{ active: active===2 }">
      <receipticon />
      <span class="btm-nav-label text-sm">訂單</span>
    </RouterLink>
    <RouterLink to="/profile" @click="active=3" :class="{ active: active===3 }">
      <usericon />
      <span class="btm-nav-label text-sm">個人檔案</span>
    </RouterLink>
  </div>
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'
import receipticon from '@/assets/icons/receipt.svg'

import { ref,onMounted } from 'vue';

const currentURL = window.location.href;
const url = new URL(currentURL);
const currentPath = url.pathname;
const PATHS = ['/home', '/shop', '/order', '/profile'];
const active = ref(PATHS.indexOf(currentPath));
</script>