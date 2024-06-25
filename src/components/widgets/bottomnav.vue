<template>
  <div class="btm-nav">
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
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'
import receipticon from '@/assets/icons/receipt.svg'

import { ref,onMounted,watch } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { useRoute } from 'vue-router';

const currentURL = window.location.href;
const url = new URL(currentURL);
const currentPath = url.pathname;
const PATHS = ['/home', '/shop', '/order', '/profile'];
const active = ref(PATHS.indexOf(currentPath));

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