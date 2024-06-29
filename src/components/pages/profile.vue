<template>
    <div class="min-h-[100dvh]">
        <div class="container mx-auto p-2 space-y-2">
            <profilecard />
            <cardlink :to="'/manage'" :text="'統計頁面'" />
            <div class="card bg-base-200 shadow-md border-gray-400">
                <div class="card-body">
                    <h2 class="card-title text-2xl">問題回報</h2>
                    Discord @watercatuwu
                    <a class="link" href="https://github.com/watercatuwu/clhs-gohan/issues/">GitHub issues</a>
                </div>
            </div>
            <settings />
        </div>
    </div>
</template>

<script setup>
import profilecard from '@/components/widgets/profilecard.vue'
import settings from '@/components/widgets/settings.vue'
import cardlink from '@/components/widgets/cardlink.vue'

import { onMounted } from 'vue'

onMounted(() => {
  const cardopacity = parseInt(localStorage.getItem('cardopacity'))
  const cardglass = JSON.parse(localStorage.getItem('cardglass'))
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.classList.add(`bg-opacity-${cardopacity}`)
    if (cardglass) card.classList.add('backdrop-blur-sm')
  })
})
</script>