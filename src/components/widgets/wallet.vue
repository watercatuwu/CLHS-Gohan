<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><walleticon /> 我的錢包</h2>
            <h2 class="card-title text-3xl">{{balance}}</h2>
        </div>
      </div>
</template>

<script setup>
import walleticon from '@/assets/icons/wallet.svg'

import { ref } from 'vue'

const balance = ref(0)
</script>