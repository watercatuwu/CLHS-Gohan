<template>
  <div v-if="userData" class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start">
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label @click="randomSponsors" for="my-drawer" class="btn btn-ghost btn-circle drawer-button"><icon name="bar"></icon></label>
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
          <div v-if="sponsorsData.length>0" class="fixed bottom-0 p-4 w-80">
            <sponsors
              :name="sponsorsData[sponsorsIndex].name"
              :image="sponsorsData[sponsorsIndex].image"
              :title="sponsorsData[sponsorsIndex].title"
              :content="sponsorsData[sponsorsIndex].content"
              :link="sponsorsData[sponsorsIndex].link"
              :linkTitle="sponsorsData[sponsorsIndex].linkTitle"
            />
          </div>
        </div>
    </div>
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
import sponsors from '@/components/widgets/sponsors.vue'

import { supabase } from '@/supabase'
import { ref,onMounted,watch,defineAsyncComponent } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { getRandom, priceSum } from '@/utils/utils'
import { cart } from '@/reactive/cart'

const router = useRouter()

const route = useRoute();
const currentPath = ref(route.path);
const userData = JSON.parse(sessionStorage.getItem('userData'))

const sponsorsData = ref(JSON.parse(sessionStorage.getItem('sponsors'))||[])
const sponsorsIndex = ref(0)

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
  avatarUrl.value = await getUserAvatar()
  sponsorsData.value = await getSponsors()
  randomSponsors()
})

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  sessionStorage.clear()
  router.push('/')
  if (error) {
    console.log(error)
  }
};

const getSponsors = async () => {
  const { data, error } = await supabase.from('sponsors').select().order('id')
  if (error){
    console.error(error)
  }
  console.log(data)
  sessionStorage.setItem('sponsors', JSON.stringify(data))
  return data
}

const randomSponsors = () => {
  sponsorsIndex.value = getRandom(0,sponsorsData.value.length)
  console.log(sponsorsIndex.value)
}
</script>