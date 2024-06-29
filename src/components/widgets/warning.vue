<template>
    <div role="alert" class="alert flex justify-center gap-1">
        <icon name="info" />
        <span>{{props.msg}}</span>
    </div>
</template>

<script setup>
import icon from '@/components/widgets/icon.vue'

import { ref } from 'vue'

const props = defineProps({
    msg: String
})
</script>