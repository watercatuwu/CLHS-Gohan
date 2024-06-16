<template>
  <div class="hero min-h-[100dvh] bg-base-100">
        <div class="hero min-h-screen backdrop-blur-sm">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="/static/logo.png" width="256" height="256" />
              </div>
            </div>
            <h1 class="text-4xl font-bold">LunCLHS NEXT</h1>
            <p class="my-4">非官方壢中熱食部點餐系統</p>
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
  <feature />
  <about />
  <roadmap />
  <footer class="footer flex justify-center items-center p-4 bg-neutral text-neutral-content">
    <aside class="items-center grid-flow-col">
      <p>LunCLHS © 2024 - All right reserved.</p>
    </aside>
  </footer>
</template>


<script setup>
import angledownicon from '@/assets/icons/angle-down.svg'

import login from "@/components/widgets/login.vue";
import feature from "@/components/widgets/feature.vue";
import about from "@/components/widgets/about.vue";
import roadmap from "@/components/widgets/roadmap.vue";
</script>