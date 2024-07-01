<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
          <div class="flex flex-row justify-between items-center">
            <button :disabled="sysNow.toISODate() === selectedDay.day.toISODate()" @click="prevDay" class="btn btn-neutral btn-sm"><<</button>
            <h2 class="text-xl font-bold">{{ selectedDay.day.setLocale('zh-tw').toFormat('MM-dd ccc') }}</h2>
            <button :disabled="sysNow.endOf('week').toISODate() === selectedDay.day.toISODate()" @click="nextDay" class="btn btn-neutral btn-sm">>></button>
          </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { DateTime } from 'luxon';

import { selectedDay } from '@/reactive/cart'

const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now

const emit = defineEmits(['update'])

const prevDay = () =>{
  selectedDay.day = selectedDay.day.minus({days: 1})
  emit('update')
}

const nextDay = () =>{
  selectedDay.day = selectedDay.day.plus({days: 1})
  console.log(selectedDay.day.toISODate())
  emit('update')
}
</script>