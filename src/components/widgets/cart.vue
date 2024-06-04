<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><carticon />購物車<span class="badge badge-primary">{{Object.keys(cart).length}}</span>            </h2>
            <div v-if="Object.keys(cart).length > 0" class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in cart">
                      <th>{{product.code}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.price}}</td>
                      <td>
                        <button @click="removeFromCart(index)"  class="btn btn-error btn-xs">移除</button>
                      </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>總計</td>
                        <td>{{priceSum(cart)}}</td>
                        <td></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <button v-show="isFormClosed" disabled class="btn btn-neutral" >表單已截止</button>
            <button v-show="!isFormClosed" @click="choosebot" class="btn btn-neutral" >選擇困難小幫手</button>
            <button v-show="Object.keys(cart).length > 0" @click="checkout" class="btn btn-primary" >結帳</button>
            <button v-show="Object.keys(cart).length > 0" @click="clearCart" class="btn btn-error" >清空購物車</button>
        </div>
    </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><shopicon />商品</h2>
            <div v-if="isDataGet" class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products.data">
                      <th>{{product.code}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.price}}</td>
                      <td>
                        <button @click="addToCart(product)" :disabled="isFormClosed"  class="btn btn-secondary btn-xs">加入</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--modal-->
    <dialog v-if="Object.keys(cart).length > 0" id="checkoutmodal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">結帳</h3>
        <p class="py-4">請確認購物車內容</p>
        <div  class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>加飯/麵</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in cart">
                <th>{{product.code}}</th>
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>
                <td class="flex item-center">
                  <input v-model="cart[index].addrice" v-if="Number.isInteger(product.code)" type="checkbox" class="checkbox checkbox-sm" />
                </td>
              </tr>
              <tr>
                  <th></th>
                  <td>總計</td>
                  <td>{{priceSum(cart)}}</td>
                  <td></td>
              </tr>
            </tbody>
          </table>
          <select v-model="payment" class="select select-bordered w-full mt-4">
              <option value="" disabled selected>請選擇付款方式</option>
              <option value="onclass">事務股長</option>
              <option value="wallet" disabled>線上錢包</option>
          </select>
      </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="space-x-2">
            <button class="btn btn-error">取消</button>
            <button :disabled="!payment" @click="checkoutsend"  class="btn btn-success">送出</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
    <!--toast-->
    <div v-if="isShowToast"  class="toast toast-center z-10">
      <div class="alert" :class="[toastType]">
        <span>{{toastMsg}}</span>
      </div>
    </div>
</template>

<script setup>
import carticon from '@/assets/icons/cart.svg'
import shopicon from '@/assets/icons/shopping.svg'

import { ref } from 'vue'
import axios from 'axios'
import { DateTime } from 'luxon'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { menuRef, ordersRef } from '@/firebase'

const cart = ref(JSON.parse(sessionStorage.getItem('cart')) || [])
const products = ref(JSON.parse(sessionStorage.getItem('products')) || {})
const payment = ref('')
const isDataGet = ref(false)

const now = DateTime.now().setZone('Asia/Taipei')

const isFormClosed = ref(false)
isFormClosed.value =  now.hour < 12 && now.hour > 10 ? true : false

const getFirestore = async (collectionRef, docid) => {
  const docRef = doc(collectionRef, docid)
  const docsnap = await getDoc(docRef)
  return docsnap.data()
}

const weekinyear = now.year.toString()+now.weekNumber.toString()

if (Object.keys(products.value).length === 0) {
  getFirestore(menuRef,weekinyear)
  .then(data => {
    let weekday = now.hour>13 ? now.plus({days: 1}).setLocale('en').weekdayShort.toLowerCase() : now.setLocale('en').weekdayShort.toLowerCase()
    //設定表單更新時間
    const result = data[weekday]
    sessionStorage.setItem('products', JSON.stringify(result))
    console.log(result)
    isDataGet.value = true
    products.value = result
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error)
})
}else{
  isDataGet.value = true
}

const addToCart = (product) => {
    if(Number.isInteger(product.code)){
      product.addrice = false
    }
    const cloneProduct = JSON.parse(JSON.stringify(product)) //deepclone
    cart.value.push(cloneProduct)
    sessionStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = (index) => {
    cart.value.splice(index, 1)
    if (cart.value.length > 0) {
        sessionStorage.setItem('cart', JSON.stringify(cart.value))
    }else{
        sessionStorage.removeItem('cart')
    }
}

const checkout = () => {
    console.log(cart.value)
    document.querySelector('#checkoutmodal').showModal()
}

const clearCart = () => {
    cart.value = []
    sessionStorage.removeItem('cart')
}

const checkoutsend = () => {
  const data = {
    "order": cart.value,
    "payment": payment.value,
    "isPay": false
  }
  const uid = JSON.parse(sessionStorage.getItem('currentUser')).uid
  console.log(data)
  const docRef = doc(ordersRef, uid)
  setDoc(docRef, data)
    .then(() => {
      showToast('結帳成功', 'alert-success')
      clearCart()
    })
    .catch((error) => {
      showToast(error, 'alert-error')
    })
}

const choosebot = () => {
  const main = products.value.data[getRandom(0,10)]
  addToCart(main)
}

const isShowToast = ref(false)
const toastType = ref('')
const toastMsg = ref('')
const showToast = (msg, type) => {
  isShowToast.value = true
  toastMsg.value = msg
  toastType.value = type
  setTimeout(() => {
    isShowToast.value = false
  }, 3000)
}

//tools
const priceSum = (arr) =>{
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    return sum
}

const getRandom = (min,max) => {
    return Math.floor(Math.random()*max)+min
}
</script>