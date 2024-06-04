<template>
    <div class="container mx-auto p-2 pb-24 space-y-2">
        <profilecard />
        <settings />
        <about />
    </div>
    <bottomnav :active="2" />
</template>

<script setup>
import bottomnav from '@/components/widgets/bottomnav.vue'
import profilecard from '@/components/widgets/profilecard.vue'
import settings from '@/components/widgets/settings.vue'
import about from '@/components/widgets/about.vue'
</script>