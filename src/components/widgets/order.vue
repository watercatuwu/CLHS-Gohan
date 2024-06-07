<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="flex justify-between">
              <h2 class="card-title text-xl"><receipticon /> 我的訂單 <span class="badge text-base" :class="[badge]">{{badgeMsg}}</span></h2>
            </div>
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>加飯</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in orders.order">
                      <th>{{index+1}}</th>
                      <td>{{order.name}}</td>
                      <td>{{order.price}}</td>
                      <td><checkcircleicon v-if="order.addrice" /></td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="uid!=='demo'" class="card-actions justify-end mt-2">
                  <button @click="fetchOrders" class="btn btn-secondary btn-sm mx-1">重新整理</button>
                  <button @click="cancelOrders" :disabled="orders.isPay || isFormClosed" class="btn btn-error btn-sm mx-1">取消訂單</button>
                </div>
            </div>
        </div>
    </div>
    <toast ref="toastRef" />
</template>

<script setup>
import receipticon from '@/assets/icons/receipt.svg'
import checkcircleicon from '@/assets/icons/check-circle.svg'

import { ref, onMounted } from 'vue'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ordersRef } from '@/firebase'
import { DateTime } from 'luxon'

import toast from '@/components/widgets/toast.vue'

const now = DateTime.now().setZone('Asia/Taipei')
const isFormClosed = ref(false)
isFormClosed.value =  now.hour < 13 && now.hour > 10 ? true : false

const orders = ref(JSON.parse(sessionStorage.getItem('orders')) || {})
const badge = ref('')
const badgeMsg = ref('')
const uid = JSON.parse(sessionStorage.getItem('currentUser')).uid

async function fetchOrders() {
  try {
    const now = DateTime.now().setZone('Asia/Taipei')
    const ISOstring = now.toISODate()
    const docRef = doc(ordersRef, ISOstring)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()[uid] //取得uid的訂單

    if (data !== undefined) {
        sessionStorage.setItem('orders', JSON.stringify(data))
        orders.value = data
      if (data.isPay) {
        badge.value = 'badge-success'
        badgeMsg.value = '已付款'
      }else{
        badge.value = 'badge-error'
        badgeMsg.value = '未付款'
      }
    }else{
      isFormClosed.value = true
      showToast('無點餐紀錄', 'alert-error')
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

onMounted(() => {
  if (Object.keys(orders.value).length === 0) {
    fetchOrders()
  }
  if (orders.value.isPay) {
    badge.value = 'badge-success'
    badgeMsg.value = '已付款'
  }else{
    badge.value = 'badge-error'
    badgeMsg.value = '未付款'
  }
})

const cancelOrders = () => {
  isFormClosed.value = true
  sessionStorage.removeItem('orders')
  orders.value = {}
  deleteDoc(doc(ordersRef, uid))
  showToast('已取消訂單', 'alert-success')
}

const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}

const priceSum = (arr) =>{
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    return sum
}
</script>