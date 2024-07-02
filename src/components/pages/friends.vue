<template>
    <div class="min-h-[100dvh]">
        <div class="container mx-auto p-2 space-y-2">
            <friends />
        </div>
    </div>
</template>

<script setup>
import friends from '@/components/widgets/friends.vue';

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