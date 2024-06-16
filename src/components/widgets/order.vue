<template>
  <div class="card bg-base-200 shadow-md border-gray-400">
    <div class="card-body">
      <div class="flex flex-row justify-between items-center">
        <button @click="switchday('prev')"  class="btn btn-neutral btn-sm"><<</button>
        <h2 class="text-xl font-bold">{{ dayselect.setLocale('zh-tw').toFormat('MM-dd ccc') }}</h2>
        <button @click="switchday('next')" class="btn btn-neutral btn-sm">>></button>
      </div>
    </div>
  </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="flex justify-between">
              <h2 class="card-title text-xl">
                <receipticon /> 我的訂單
                <!--<span class="badge text-base" :class="[badge]">{{badgeMsg}}</span>-->
              </h2>
            </div>
            <div class="overflow-x-auto max-h-72">
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
                    <tr v-for="(order, index) in orders.order" class="border-0">
                      <th>{{index+1}}</th>
                      <td>{{order.name}}</td>
                      <td>{{order.price}}</td>
                      <td><checkcircleicon v-if="order.addrice" /></td>
                    </tr>
                    <tr class="sticky bottom-0 bg-base-200">
                      <th></th>
                      <td>總計</td>
                      <td>{{priceSum(orders.order)}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div v-if="uid!=='demo'" class="card-actions justify-end mt-2">
              <button @click="fetchOrders" class="btn btn-secondary btn-sm mx-1">重新整理</button>
              <button @click="cancelOrders" :disabled="orders.isPay || cantCancel" class="btn btn-error btn-sm mx-1">取消訂單</button>
            </div>
        </div>
    </div>
    <toast ref="toastRef" />
</template>

<script setup>
import receipticon from '@/assets/icons/receipt.svg'
import checkcircleicon from '@/assets/icons/check-circle.svg'

import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import { ordersRef } from '@/firebase'
import { DateTime } from 'luxon'

import toast from '@/components/widgets/toast.vue'

const now = DateTime.now().setZone('Asia/Taipei')
const cantCancel = ref(true)
cantCancel.value =  now.hour < 13 && now.hour > 10 ? true : false

const sysNow = now.hour>=13 ? now.plus({days: 1}) : now
const dayselect = ref()
const dayselectStroge = JSON.parse(sessionStorage.getItem('dayselect'))
if(dayselectStroge){
  dayselect.value = DateTime.fromISO(dayselectStroge) //透過儲存的iso字串轉換為DateTime物件
}else{
  dayselect.value = sysNow
}

const orders = ref(JSON.parse(sessionStorage.getItem(`order${dayselect.value.toISODate()}`)) || {})
const badge = ref('')
const badgeMsg = ref('')
const uid = JSON.parse(sessionStorage.getItem('currentUser')).uid

const switchday = (type) => {

  if (type === 'prev' && dayselect.value.toISODate() > sysNow.toISODate()) {
    dayselect.value = dayselect.value.minus({days: 1})
  }
  if(type === 'next' && dayselect.value.toISODate() < sysNow.endOf('week').toISODate()) {
    dayselect.value = dayselect.value.plus({days: 1})
  }

  //for dev
  /*
  if (type === 'prev') {
    dayselect.value = dayselect.value.minus({days: 1})
  }
  if(type === 'next') {
    dayselect.value = dayselect.value.plus({days: 1})
  }
  */

  sessionStorage.setItem('dayselect', JSON.stringify(dayselect.value.toISODate())) //儲存為iso字串
  const orderStorage = sessionStorage.getItem(`order${dayselect.value.toISODate()}`)
  console.log(orderStorage)
  if (orderStorage) {
    orders.value = JSON.parse(orderStorage)
    cantCancel.value = false
  }else{
    fetchOrders()
  }
}

async function fetchOrders() {
  try {
    const docRef = doc(ordersRef, dayselect.value.toISODate())
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    if (!data) {
      showToast('無點餐紀錄', 'alert-error')
      cantCancel.value = true
      orders.value = {}
      return //中止function
    }
    const uidData = data[uid]
    if (uidData) {
        sessionStorage.setItem(`order${dayselect.value.toISODate()}`, JSON.stringify(uidData))
        orders.value = uidData
        cantCancel.value = false
        console.log(uidData)
      if (uidData.isPay) {
        badge.value = 'badge-success'
        badgeMsg.value = '已付款'
      }else{
        badge.value = 'badge-error'
        badgeMsg.value = '未付款'
      }
    }else{
      cantCancel.value = true
      showToast('無點餐紀錄', 'alert-error')
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    showToast(error, 'alert-error')
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

const getFirestore = async (collectionRef, docid) => {
  const docRef = doc(collectionRef, docid)
  const docsnap = await getDoc(docRef)
  return docsnap.data()
}

const cancelOrders = () => {
  try{
    cantCancel.value = true
    sessionStorage.removeItem('orders')
    orders.value = {}
    updateDoc(doc(ordersRef, dayselect.value.toISODate()), {[uid]: deleteField()})
    showToast('已取消訂單', 'alert-success')
  }catch(error){
     console.error(error)
    showToast(error, 'alert-error')
  }
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