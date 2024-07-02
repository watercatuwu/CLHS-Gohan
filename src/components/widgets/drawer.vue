<template>
    <div class="drawer">
        <input v-model="isOpen" id="maindrawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side z-50">
          <label for="maindrawer" aria-label="close sidebar" class="drawer-overlay"></label>
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
            <li @click="isOpen = !isOpen" v-for="link in links" class="transition transform ease-in-out duration-300 scale-100 hover:scale-105 active:scale-100">
              <RouterLink :to="link.path" :class="{'bg-primary': link.path === currentPath, 'text-primary-content': link.path === currentPath}">
                <icon :name="link.icon" />
                <span>{{link.name}}</span>
              </RouterLink>
            </li>
            <div class="divider"></div>
            <li>
              <themepickerDrawer />
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
              :disabled="sponsorsToggle"
            />
          </div>
        </div>
    </div>
</template>
<script setup>
import icon from '@/components/widgets/icon.vue'
import sponsors from '@/components/widgets/sponsorscard.vue'
import themepickerDrawer from '@/components/widgets/themepickerDrawer.vue';

import { supabase } from '@/supabase'
import { ref,onMounted,watch } from 'vue';
import { getUserAvatar } from '@/utils/supabase';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { getRandom } from '@/utils/utils'

const router = useRouter()

const route = useRoute();
const currentPath = ref(route.path);
const userData = JSON.parse(sessionStorage.getItem('userData'))

const isOpen = ref(false)

const sponsorsData = ref(JSON.parse(sessionStorage.getItem('sponsors'))||[])
const sponsorsIndex = ref(0)

const links = [
  { name: '主頁', path: '/home', icon: 'home' },
  { name: '商店', path: '/shop', icon: 'store' },
  { name: '訂單', path: '/order', icon: 'receipt' },
  { name: '個人資料', path: '/profile', icon: 'user' },
  { name: '統計資料', path: '/manage', icon: 'chart' },
]

const avatarUrl = ref('')
const sponsorsToggle = ref(false)

onMounted(async () => {
  avatarUrl.value = await getUserAvatar()
  sponsorsData.value = await getSponsors()
  randomSponsors()
})

watch(() => route.path, (newroute)=>{
  currentPath.value = newroute
})

watch(() => isOpen.value, (isOpen) => {
  //當抽屜開啟
  if (isOpen) {
    randomSponsors()
  }
});

const getSponsors = async () => {
  const { data, error } = await supabase.from('sponsors').select().order('id')
  if (error){
    console.error(error)
  }
  sessionStorage.setItem('sponsors', JSON.stringify(data))
  return data
}

const randomSponsors = () => {
  sponsorsIndex.value = getRandom(0,sponsorsData.value.length)
}
</script>