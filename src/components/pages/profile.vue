<template>
    <div id="main" class="bg-fixed bg-center bg-cover min-h-[100dvh]">
        <div class="container mx-auto p-2 pb-24 space-y-2">
            <profilecard />
            <cardlink :uid="uid" :to="'/manage'" :text="'管理頁面'" />
            <div class="card bg-base-200 shadow-md border-gray-400">
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <h2 class="card-title text-2xl">客服</h2>
                        請洽Discord @watercatuwu
                    </div>
                </div>
            </div>
            <settings />
        </div>
    </div>
</template>

<script setup>
import anglerighticon from '@/assets/icons/angle-right.svg'

import profilecard from '@/components/widgets/profilecard.vue'
import settings from '@/components/widgets/settings.vue'
import cardlink from '@/components/widgets/cardlink.vue'

import { ref, onMounted } from 'vue'

const currentUser = ref(JSON.parse(sessionStorage.getItem('currentUser')))
const uid = ref(currentUser.value.uid)

onMounted(() => {
  const imgurl = localStorage.getItem('imgurl')
  const cardopacity = parseInt(localStorage.getItem('cardopacity'))
  const app = document.querySelector('#main')
  app.style.backgroundImage = `url(${imgurl})`
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.classList.add(`bg-opacity-${cardopacity}`)
  })
})
</script>