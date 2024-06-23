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
  <bottomnav v-show="!navDisabledPages.includes(route.name)" />
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import bottomnav from './components/widgets/bottomnav.vue';

const navDisabledPages = ['index', '404'];

const route = useRoute();

onMounted(() => {
  const imgurl = localStorage.getItem('imgurl')
  const app = document.querySelector('#bg')
  app.style.backgroundImage = `url(${imgurl})`
})
</script>
