<template>
  <div class="h-[100dvh] flex flex-col">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
    <bottomnav v-show="route.name !== 'index'"  />
  </div>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router'
import bottomnav from './components/widgets/bottomnav.vue';

const route = useRoute();
</script>
