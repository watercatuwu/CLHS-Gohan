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
            <h2 class="card-title text-xl"><carticon />購物車<span class="badge badge-primary">{{Object.keys(cart).length}}</span></h2>
            <div v-if="Object.keys(cart).length > 0" class="overflow-auto max-h-96">
                <table class="table">
                  <thead>
                    <tr class="sticky top-0 bg-base-200 border-0">
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in cart" class="border-0">
                      <th>{{product.code}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.price}}</td>
                      <td>
                        <button @click="removeFromCart(index)"  class="btn btn-error btn-xs whitespace-nowrap">移除</button>
                      </td>
                    </tr>
                    <tr class="sticky bottom-0 bg-base-200">
                      <th></th>
                      <td>總計</td>
                      <td>{{priceSum(cart)}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <button v-show="isFormClosed || !products.isOpened" disabled class="btn btn-neutral" >表單已截止</button>
            <button v-show="!isFormClosed && products.isOpened" @click="choosebot" class="btn btn-neutral" >選擇困難小幫手</button>
            <button v-show="Object.keys(cart).length > 0" @click="checkout" class="btn btn-primary" >結帳</button>
            <button v-show="Object.keys(cart).length > 0" @click="clearCart" class="btn btn-error" >清空購物車</button>
        </div>
    </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><shopicon />商品</h2>
            <h2 v-if="isDataGet && !products.isOpened" class="card-title text-xl">本日放假</h2>
            <div v-if="isDataGet && products.isOpened" class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr class="border-0">
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products.data" class="border-0">
                      <th>{{product.code}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.price}}</td>
                      <td>
                        <button @click="addToCart(product)" :disabled="isFormClosed" class="btn btn-secondary btn-sm whitespace-nowrap">加入</button>
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
              <option value="onclass">現金支付</option>
              <!--<option value="wallet" disabled>線上錢包</option>-->
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
    <toast ref="toastRef" />
</template>

<script setup>
import carticon from '@/assets/icons/cart.svg'
import shopicon from '@/assets/icons/shopping.svg'

import { ref } from 'vue'
import axios from 'axios'
import { DateTime } from 'luxon'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { menuRef, ordersRef } from '@/firebase'
import { getRandom, priceSum } from '@/utils/utils'


import toast from '@/components/widgets/toast.vue'

const cart = ref(JSON.parse(sessionStorage.getItem('cart')) || [])
const payment = ref('')
const isDataGet = ref(false)

const isFormClosed = ref(false)
const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now

isFormClosed.value =  now.hour < 13 && now.hour > 10 ? true : false

const dayselect = ref()
const dayselectStroge = JSON.parse(sessionStorage.getItem('dayselect'))
if(dayselectStroge){
  dayselect.value = DateTime.fromISO(dayselectStroge) //透過儲存的iso字串轉換為DateTime物件
}else{
  dayselect.value = sysNow
}
const products = ref(JSON.parse(sessionStorage.getItem(`menu${dayselect.value.toISODate()}`)) || {})

const switchday = (type) => {
  clearCart()
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
  const menuStorage = sessionStorage.getItem(`menu${dayselect.value.toISODate()}`)
  if (menuStorage) {
    products.value = JSON.parse(menuStorage)
    isDataGet.value = true
  }else{
    getFirestore(menuRef, dayselect.value.toISODate())
    .then(data => {
      const result = setComboMeal(data)
      sessionStorage.setItem(`menu${dayselect.value.toISODate()}`, JSON.stringify(result))
      isDataGet.value = true
      products.value = result
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  }
}

const getFirestore = async (collectionRef, docid) => {
  const docRef = doc(collectionRef, docid)
  const docsnap = await getDoc(docRef)
  return docsnap.data()
}

//如果沒有Product資料就抓取資料
if (Object.keys(products.value).length === 0) {
  getFirestore(menuRef, sysNow.toISODate())
  .then(data => {
    const result = setComboMeal(data)
    sessionStorage.setItem(`menu${sysNow.toISODate()}`, JSON.stringify(result))
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
  cart.value.unshift(cloneProduct) //將元素新增至首位
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
  document.querySelector('#checkoutmodal').showModal()
}

const clearCart = () => {
  cart.value = []
  sessionStorage.removeItem('cart')
}

const checkoutsend = () => {
  const uid = JSON.parse(sessionStorage.getItem('currentUser')).uid
  if (uid === "demo") {
    showToast('請先登入', 'alert-error')
  }else{
  const data = {
    [uid]: {
      "class": JSON.parse(sessionStorage.getItem('userdata')).class,
      "number": JSON.parse(sessionStorage.getItem('userdata')).number,
      "order": cart.value,
      "payment": payment.value,
      "isPay": false
    }
  }
  const docRef = doc(ordersRef, dayselect.value.toISODate())
  setDoc(docRef, data, { merge: true })
    .then(() => {
      showToast('結帳成功', 'alert-success')
      clearCart()
    })
    .catch((error) => {
      showToast(error, 'alert-error')
    })
  }
}

const choosebot = () => {
  const main = products.value.data[getRandom(0,products.value.data.length)]
  addToCart(main)
}

const setComboMeal = (menu) =>{
  if (!menu.isOpened) {
    return menu
  }

  const fastfood = menu.data.slice(-6,-3)
  const drink = menu.data.slice(-3)

  fastfood.forEach((elementA) => {
    drink.forEach((elementB) => {
      menu.data.push({
        code:elementA.code + elementB.code,
        name:elementA.name + '+' +elementB.name,
        price:elementA.price + elementB.price - 5
      })
    })
  })

  return menu
}

// toast
const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>