<template>
  <div v-if="userData" class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start">
      <label id="darwerbtn" for="maindrawer" class="btn btn-ghost btn-circle drawer-button"><icon name="bar"></icon></label>
      <drawer />
    </div>
  <div class="navbar-end gap-2">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <icon name='cart' />
          <span class="badge badge-sm indicator-item">{{cart.length}}</span>
        </div>
      </div>
      <div
        tabindex="0"
        class="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow">
        <div class="card-body">
          <span class="text-lg font-bold">{{cart.length}} 個商品</span>
          <span class="text-info">小計: ${{priceSum(cart)}}</span>
          <div class="card-actions">
            <RouterLink to='/shop' class="btn btn-primary btn-block btn-sm">前往購物車</RouterLink>
          </div>
        </div>
      </div>
    </div>

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
      <div tabindex="0" class="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow">
        <div class='card-body'>
          <h2 class='text-lg font-bold'>{{userData.auth.user_metadata.name}}</h2>
          <div class='card-actions'>
            <button class="btn btn-sm btn-error btn-block" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import icon from '@/components/widgets/icon.vue'
import drawer from '@/components/widgets/drawer.vue';

import { supabase } from '@/supabase'
import { ref,onMounted } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { priceSum } from '@/utils/utils'
import { cart } from '@/reactive/cart'

const router = useRouter()

const route = useRoute();
const currentPath = ref(route.path);
const userData = JSON.parse(sessionStorage.getItem('userData'))

const sponsorsData = ref(JSON.parse(sessionStorage.getItem('sponsors'))||[])
const sponsorsIndex = ref(0)

const isRing = ref(false);

const avatarUrl = ref('')

onMounted(async () => {
  avatarUrl.value = await getUserAvatar()
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