<template>
    <div class="min-h-[100dvh]">
      <div class="container mx-auto p-2 space-y-2">
            <manage />
        </div>
    </div>
</template>

<script setup>
import manage from '@/components/widgets/manage.vue'

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