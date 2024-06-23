<template>
  <div id="hero" class="hero min-h-[100dvh] bg-base-100">
        <div class="hero min-h-screen backdrop-brightness-50">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="/static/logo.png" width="256" height="256" />
              </div>
            </div>
            <h1 class="text-4xl font-bold">CLHS Gohan</h1>
            <p class="my-4">非官方中大壢中熱食部點餐系統</p>
            <login />
            <div class="my-4">
              <a href="https://github.com/watercatuwu/lunclhsnext/blob/main/privacy.md" class="link">隱私權政策</a>
            </div>
            <div class="flex justify-center my-4">
              <angledownicon class="animate-bounce"/>
            </div>
          </div>
        </div>
    </div>
  </div>
  <!--Features-->
  <features />
  <!--About-->
  <div class="w-full p-10 bg-base-100">
    <div class="my-8 space-y-4">
        <h1 class="text-3xl font-bold flex items-center">關於</h1>
        <p class="text-lg">CLHS Gohan是由watercatuwu開發的壢中熱食部非官方點餐系統</p>
        <p class="text-lg text-red-500">注意：本系統並無與熱食部連動，僅供事務統計使用。</p>
        <p class="text-lg">詳細請見<a href="https://github.com/watercatuwu/lunclhsnext" class="link text-lg">Github Repo</a></p>
    </div>
  </div>
  <roadmap />
  <footer class="footer flex justify-center items-center p-4 bg-neutral text-neutral-content">
    <aside class="items-center grid-flow-col">
      <p>CLHS Gohan © 2024 - All right reserved.</p>
    </aside>
  </footer>
</template>


<script setup>
import angledownicon from '@/assets/icons/angle-down.svg'

import login from "@/components/widgets/login.vue";
import roadmap from "@/components/widgets/roadmap.vue";
import features from "@/components/widgets/features.vue";

import { onMounted } from 'vue'

onMounted(() => {
  const imgurl = localStorage.getItem('imgurl')
  const app = document.querySelector('#hero')
  app.style.backgroundImage = `url(${imgurl})`
})
</script>