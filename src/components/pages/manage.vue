<template>
    <div id="main" class="bg-fixed bg-center bg-cover min-h-[100dvh]">
        <div class="container mx-auto p-2 pb-24 space-y-2">
            <manage />
        </div>
    </div>
</template>

<script setup>
import manage from '@/components/widgets/manage.vue'

import { onMounted } from 'vue'

onMounted(() => {
  const imgurl = localStorage.getItem('imgurl')
  const cardopacity = localStorage.getItem('cardopacity')
  const app = document.querySelector('#main')
  app.style.backgroundImage = `url(${imgurl})`
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.classList.add(`bg-opacity-${cardopacity}`)
  })
})
</script>