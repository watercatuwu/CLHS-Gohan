<template>
  <div class="btm-nav">
    <RouterLink to="/home" @click="active=0" :class="{ active: active===0 }">
      <homeicon />
    </RouterLink>
    <RouterLink to="/shop" @click="active=1" :class="{ active: active===1 }">
      <storeicon />
    </RouterLink>
    <RouterLink to="/order" @click="active=2" :class="{ active: active===2 }">
      <receipticon />
    </RouterLink>
    <RouterLink to="/profile" @click="active=3" :class="{ active: active===3 }">
      <div v-if="avatarUrl===null">
        <usericon />
      </div>
      <div v-else class="avatar">
        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
          <img :src="avatarUrl" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'
import receipticon from '@/assets/icons/receipt.svg'

import { ref,onMounted } from 'vue';
import { getUserAvatar } from '@/utils/supabase';

const currentURL = window.location.href;
const url = new URL(currentURL);
const currentPath = url.pathname;
const PATHS = ['/home', '/shop', '/order', '/profile'];
const active = ref(PATHS.indexOf(currentPath));

const avatarUrl = ref('');
onMounted(async () => {
  avatarUrl.value = await getUserAvatar();
})
</script>