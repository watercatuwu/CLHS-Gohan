<template>
    <div class="container mx-auto p-2 pb-24 space-y-2">
        <wallet />
        <hot />
        <annouce />
    </div>
    <bottomnav :active="0" />
</template>

<script setup>
import bottomnav from '@/components/widgets/bottomnav.vue';
import wallet from '@/components/widgets/wallet.vue';
import hot from '@/components/widgets/hot.vue';
import annouce from '@/components/widgets/annouce.vue';

import { useRouter } from 'vue-router'

const router = useRouter()
</script>