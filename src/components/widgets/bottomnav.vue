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
    <RouterLink to="/profile" @click="active=2" :class="{ active: active===2 }">
      <usericon />
      <span class="btm-nav-label text-sm">個人檔案</span>
    </RouterLink>
  </div>
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'

import { RouterLink } from 'vue-router'

import { ref } from 'vue';

const active = ref(2);
</script>