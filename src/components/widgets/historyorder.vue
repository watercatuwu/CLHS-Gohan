<template>
<div class="card bg-base-200 shadow-md border-gray-400">
    <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title text-xl">
            <archiveicon /> 歷史訂單
          </h2>
        </div>
        <div class="overflow-x-auto max-h-100">
            <table class="table">
              <!-- head -->
              <thead>
                <tr class="border-0">
                  <th>Date</th>
                  <th>品項</th>
                  <th>金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" class="border-0">
                  <th>{{dateformat(order.date)}}</th>
                  <td>{{orderstring(order.order)}}</td>
                  <td>{{priceSum(order.order)}}</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script setup>
import archiveicon from '@/assets/icons/archive.svg'

import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { DateTime } from 'luxon'

import { priceSum } from '@/utils/utils'

const orders = ref([])

const fetchDatas = async () => {
  const uesrData = JSON.parse(sessionStorage.getItem('userData'))
  const { data, error } = await supabase.from('orders').select('*').limit(7)
  .eq('uuid', uesrData.auth.id)
  .order('date', { ascending: false })

  orders.value = data
  console.log(data)
}

onMounted(() => {
  fetchDatas()
})

const dateformat = (orderdate) => {
  let date = DateTime.fromISO(orderdate)
  if (date.year === DateTime.now().year) {
    return DateTime.fromISO(date).toFormat('MM/dd')
  }else{
    return DateTime.fromISO(date).toFormat('yy/MM/dd')
  }
}

const orderstring = (order) => {
    const arr = []
    for(let food of order){
        arr.push(food.name)
    }
    return arr.join(',')
}
</script>