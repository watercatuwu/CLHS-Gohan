<template>
<div id="main" class="bg-fixed bg-center bg-cover min-h-[100dvh]">
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="text-6xl font-bold text-center">404</div>
    <div class="text-xl text-center">Page not found</div>
  </div>
</div>
</template>

<script setup>
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
