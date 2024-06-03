<template>
    <div class="container mx-auto p-2 pb-24 space-y-2">
        <cart />
    </div>
    <bottomnav :active="1"/>
</template>

<script setup>
import bottomnav from '@/components/widgets/bottomnav.vue'
import cart from '@/components/widgets/cart.vue'
</script>