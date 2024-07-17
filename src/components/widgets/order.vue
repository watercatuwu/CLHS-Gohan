<template>
    <dayselect @update="updateOrders" />
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="flex items-center gap-2">
              <h2 class="card-title text-xl">
                <receipticon /> 我的訂單
              </h2>
              <span v-if="isPay" class="badge badge-lg" :class="{ 'badge-success': isPay }">已付款</span>
              <span v-else class="badge badge-lg" :class="{ 'badge-error': !isPay }">未付款</span>
            </div>
            <transition name="fade" mode="out-in">
            <div class="overflow-x-auto max-h-72">
                <div v-if="Object.keys(orders).length === 0" class="card-title text-xl">無訂單</div>
                <table v-if="Object.keys(orders).length > 0" class="table">
                  <!-- head -->
                  <thead>
                    <tr class="border-0">
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>加飯</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in orders" class="border-0">
                      <th>{{index+1}}</th>
                      <td>{{order.name}}</td>
                      <td>{{order.price}}</td>
                      <td><checkcircleicon v-if="order.addrice" /></td>
                    </tr>
                    <tr class="sticky bottom-0 bg-base-200">
                      <th></th>
                      <td>總計</td>
                      <td>{{priceSum(orders)}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </transition>
            <div class="card-actions justify-end mt-2">
              <button @click="cancelOrders" :disabled="isPay || cantCancel" class="btn btn-error btn-sm mx-1">取消訂單</button>
            </div>
        </div>
    </div>
    <toast ref="toastRef" />
</template>

<script setup>
import receipticon from '@/assets/icons/receipt.svg'
import checkcircleicon from '@/assets/icons/check-circle.svg'

import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { supabase } from '@/supabase'
import { selectedDay } from '@/reactive/cart'
import { priceSum } from '@/utils/utils'

import dayselect from '@/components/widgets/dayselect.vue'
import toast from '@/components/widgets/toast.vue'

const now = DateTime.now().setZone('Asia/Taipei')
const cantCancel = ref(true)

const orders = ref({})
const isPay = ref(false)

const updateOrders = async () => {
  await fetchOrders()
}

async function fetchOrders() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const { data, error } = await supabase.from('orders').select('*')
  .eq('date', selectedDay.day.toISODate())
  .eq('uuid', userData.auth.id)
  .single()
  if (error) {
    console.log(error)
    if (error.code ==='PGRST116'){
      showToast('無訂單', 'alert-error')
      cantCancel.value = true
      orders.value = {}
      isPay.value = false
    }
    return
  }
  cantCancel.value = false
  orders.value = data.order
  isPay.value = data.isPay
}

onMounted(async() => {
  if (Object.keys(orders.value).length === 0) {
    await fetchOrders()
  }
})

const cancelOrders = async () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    cantCancel.value = true
    orders.value = {}
    const { error } = await supabase.from('orders').delete().eq('id', selectedDay.day.toISODate()+'-'+userData.auth.id)
  if(error){
    console.error(error)
    showToast(error, 'alert-error')
    return
  }
  showToast('已取消訂單', 'alert-success')
}

const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>