<template>
  <div class="btm-nav">
    <RouterLink to="/home" :class="{ active: active===0 }">
      <homeicon />
    </RouterLink>
    <RouterLink to="/shop" :class="{ active: active===1 }">
      <storeicon />
    </RouterLink>
    <RouterLink to="/profile" :class="{ active: active===2 }">
      <usericon />
    </RouterLink>
  </div>
</template>

<script setup>
import homeicon from '@/assets/icons/home.svg'
import storeicon from '@/assets/icons/store.svg'
import usericon from '@/assets/icons/user-circle.svg'

import { RouterLink } from 'vue-router'

import { ref } from 'vue';

const props = defineProps({
  active: { type: Number,required: true },
});

const active = ref(props.active);
</script>