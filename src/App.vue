<template>
  <div id="bg" class="min-h-[100dvh] bg-fixed bg-center bg-cover">
    <div class="flex flex-col">
      <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </Transition>
      </router-view>
    </div>
  </div>
  <bottomnav v-if="showNavbar" />
  <SpeedInsights />
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import bottomnav from './components/widgets/bottomnav.vue';

import { SpeedInsights } from "@vercel/speed-insights/vue"

const route = useRoute();
const showNavbar = ref(false);

watch(() => route.meta, (newMeta) => {
  showNavbar.value = newMeta.navbar !== false;
}, { immediate: true });

onMounted(() => {
  const imgurl = localStorage.getItem('imgurl')
  const app = document.querySelector('#bg')
  app.style.backgroundImage = `url(${imgurl})`
})
</script>
