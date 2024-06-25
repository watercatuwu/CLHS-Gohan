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
  <Nav v-if="showNavbar" />
  <SpeedInsights />
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import Nav from '@/components/widgets/nav.vue';

import { SpeedInsights } from "@vercel/speed-insights/vue"

const route = useRoute();
const showNavbar = ref(false);

watch(() => route.meta, (newMeta) => {
  showNavbar.value = newMeta.navbar !== false;
}, { immediate: true });

onMounted(() => {
  const img = localStorage.getItem('img')
  const bg = document.querySelector('#bg')
  bg.style.backgroundImage = `url(${img})`
})
</script>
