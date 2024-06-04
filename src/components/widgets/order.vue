<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><receipticon /> 我的訂單 <span class="badge text-base" :class="[badge]">{{badgeMsg}}</span></h2>
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
            </div>
        </div>
    </div>
</template>

<script setup>
import receipticon from '@/assets/icons/receipt.svg'
import checkcircleicon from '@/assets/icons/check-circle.svg'

import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { ordersRef } from '@/firebase'

const orders = ref({})
const badge = ref('')
const badgeMsg = ref('')
const uid = JSON.parse(sessionStorage.getItem('currentUser')).uid

const getFirestore = async (collectionRef ,docid) => {
  const docRef = doc(collectionRef, docid)
  const docsnap = await getDoc(docRef)
  return docsnap.data()
}

getFirestore(ordersRef, uid)
.then(data => {
  console.log(data)
  orders.value = data
  if (data.isPay) {
    badge.value = 'badge-success'
    badgeMsg.value = '已付款'
  } else {
    badge.value = 'badge-error'
    badgeMsg.value = '未付款'
  }
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error)
})

const priceSum = (arr) =>{
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    return sum
}
</script>