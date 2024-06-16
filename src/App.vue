<template>
  <div class="h-[100dvh] flex flex-col">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
    <bottomnav v-show="!navDisabledPages.includes(route.name)"  />
  </div>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref } from 'vue'
import bottomnav from './components/widgets/bottomnav.vue';

const navDisabledPages = ['index', '404'];

const route = useRoute();
</script>
