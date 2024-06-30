<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
          <div class="flex flex-row justify-between items-center">
            <button :disabled="sysNow.toISODate() === dayselect.toISODate()" @click="prevDay" class="btn btn-neutral btn-sm"><<</button>
            <h2 class="text-xl font-bold">{{ dayselect.setLocale('zh-tw').toFormat('MM-dd ccc') }}</h2>
            <button :disabled="sysNow.endOf('week').toISODate() === dayselect.toISODate()" @click="nextDay" class="btn btn-neutral btn-sm">>></button>
          </div>
        </div>
    </div>
</template>
<script setup>
import { DateTime } from 'luxon';
const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now
</script>