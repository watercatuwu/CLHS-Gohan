<template>
    <div v-if="sponsorsToggle" class="card bg-base-300 shadow-md">
        <figure class="max-h-32 bg-base-300">
            <img :src="props.image" class="h-full w-full object-cover max-h-32" />
        </figure>
        <div class="card-body">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <icon name="heart" />
                    <h2 class="card-title">{{ props.title }}</h2>
                </div>
                <span class="badge badge-secondary text-nowrap">贊助</span>
            </div>
            <p>{{ props.content }}</p>
            <p class="opacity-50 text-sm">Sponsored by {{props.name}}</p>
            <div class="card-action">
                <a :href="props.link" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary w-full">{{props.linkTitle}}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import emitter from '@/bus'

import icon from '@/components/widgets/icon.vue'

const props = defineProps({
    name: String,
    image: String,
    title: String,
    content: String,
    link: String,
    linkTitle: String,
})

const sponsorsToggle = ref(false)

const getSponsorsToggle = () => {
  const localToggle = JSON.parse(localStorage.getItem('sponsorsToggle'))
  sponsorsToggle.value = localToggle!==false //直接返回boolean
}

onMounted(()=>{
    getSponsorsToggle()
})

emitter.on('settingsUpdate',()=>{
    getSponsorsToggle()
})
</script>