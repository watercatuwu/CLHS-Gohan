<template>
    <div class="flex flex-row items-center gap-4 justify-center">
        <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
        </span>
        <p class="text-lg">已有{{counter}}名學生正在使用</p>
    </div>
</template>

<script setup>
import {supabase} from '@/supabase'
import {ref, onMounted} from 'vue'

const counter = ref(0)

onMounted(async()=>{
    const {data,error,count} = await supabase.from('users').select('*', { count: 'exact' })
    counter.value = count
})
</script>