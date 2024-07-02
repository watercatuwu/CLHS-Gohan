<template>
    <div v-if="sponsorsToggle" class="card h-52 image-full bg-base-300 shadow-md">
        <figure>
            <img :src="sponsorsData[sponsorsIndex].image" class="object-contain" />
        </figure>
        <div class="card-body">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <icon name="heart" />
                    <h2 class="card-title text-2xl">{{ sponsorsData[sponsorsIndex].title }}</h2>
                </div>
                <span class="badge badge-lg badge-secondary text-nowrap">贊助</span>
            </div>
            <p class="text-xl">{{ sponsorsData[sponsorsIndex].content }}</p>
            <p class="opacity-50 text-sm md:hidden">Sponsored by {{sponsorsData[sponsorsIndex].name}}</p>
            <div class="card-action flex justify-end items-end">
                <p class="opacity-50 text-sm md:block hidden">Sponsored by {{sponsorsData[sponsorsIndex].name}}</p>
                <a :href="sponsorsData[sponsorsIndex].link" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full md:w-auto">{{sponsorsData[sponsorsIndex].linkTitle}}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { supabase } from '@/supabase'
import { getRandom } from '@/utils/utils'
import emitter from '@/bus';

import icon from '@/components/widgets/icon.vue'

const sponsorsToggle = ref(false)

const sponsorsData = ref(JSON.parse(sessionStorage.getItem('sponsors'))||[])
const sponsorsIndex = ref(2)

onMounted(()=>{
  getSponsors()
  randomSponsors()
  getSponsorsToggle()
})

const getSponsorsToggle = () => {
  const localToggle = JSON.parse(localStorage.getItem('sponsorsToggle'))
  if (localToggle!==null && localToggle){
    sponsorsToggle.value = true
  } else {
    sponsorsToggle.value = false
  }
}

const getSponsors = async () => {
  const { data, error } = await supabase.from('sponsors').select().order('id')
  if (error){
    console.error(error)
  }
  sessionStorage.setItem('sponsors', JSON.stringify(data))
  return data
}

const randomSponsors = () => {
  sponsorsIndex.value = getRandom(0,sponsorsData.value.length)
}

emitter.on('settingsUpdate',()=>{
    getSponsorsToggle()
})
</script>