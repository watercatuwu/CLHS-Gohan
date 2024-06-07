<template>
    <div>
        <div class="container mx-auto p-2 pb-24 space-y-2">
            <profilecard />
            <cardlink :uid="uid" :to="'/manage'" :text="'管理頁面'" />
            <settings />
        </div>
    </div>
</template>

<script setup>
import profilecard from '@/components/widgets/profilecard.vue'
import settings from '@/components/widgets/settings.vue'
import cardlink from '@/components/widgets/cardlink.vue'

import { ref } from 'vue'

const currentUser = ref(JSON.parse(sessionStorage.getItem('currentUser')))
const uid = ref(currentUser.value.uid)
</script>