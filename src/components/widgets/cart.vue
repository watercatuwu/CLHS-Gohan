<template>
  <warning :msg="warningMsg" />
    <dayselect @update="updateProduct" />
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><icon name="cart" />購物車<span class="badge badge-primary">{{Object.keys(cart).length}}</span></h2>
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
            <button v-show="isFormClosed || !products.isOpenToday" disabled class="btn btn-neutral" >表單已截止</button>
            <button v-show="!isFormClosed && products.isOpenToday" @click="choosebot" class="btn btn-accent" >選擇困難小幫手</button>
            <button v-show="Object.keys(cart).length > 0" @click="checkout" class="btn btn-primary" >結帳</button>
            <button v-show="Object.keys(cart).length > 0" @click="clearCart" class="btn btn-error" >清空購物車</button>
        </div>
    </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><icon name="store" />商品</h2>
            <h2 v-if="isDataGet && !products.isOpenToday" class="card-title text-xl">本日放假</h2>
            <div v-if="isDataGet && products.isOpenToday" class="overflow-x-auto">
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
import icon from '@/components/widgets/icon.vue'
import warning from '@/components/widgets/warning.vue'
import dayselect from '@/components/widgets/dayselect.vue'
import { cart, selectedDay } from '@/reactive/cart'

import { onMounted, ref } from 'vue'
import axios from 'axios'
import { DateTime } from 'luxon'
import { getRandom, priceSum } from '@/utils/utils'

import { supabase } from '@/supabase'


import toast from '@/components/widgets/toast.vue'

const payment = ref('')
const isDataGet = ref(false)

const isFormClosed = ref(false)
const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now

const warningMsg = ref('')

isFormClosed.value =  now.hour < 13 && now.hour > 10 ? true : false

const products = ref({})

onMounted(async() => {
  products.value = await fetchMenus()
})

const fetchMenus = async() => {
  const {data, error} = await supabase.from('menus').select('*').eq('date', selectedDay.day.toISODate()).single()
  if (error) {
    console.log(error)
  }else{
    isDataGet.value = true
    const closeTime = DateTime.fromISO(data.closeTime).setLocale('zh-tw')
    warningMsg.value = `點餐截止時間:  ${closeTime.toFormat('T')}`
    return setComboMeal(data)
  }
}

const updateProduct = async() =>{
  clearCart()
  products.value = await fetchMenus()
}


const addToCart = (product) => {
  if(Number.isInteger(product.code)){
    product.addrice = false
  }
  const cloneProduct = JSON.parse(JSON.stringify(product)) //deepclone
  cart.unshift(cloneProduct) //將元素新增至首位

  showToast('已加入購物車')
}

const removeFromCart = (index) => {
  cart.splice(index, 1)
  showToast('已移出購物車')
}

const checkout = () => {
  document.querySelector('#checkoutmodal').showModal()
}

const clearCart = () => {
  cart.length = 0
}

const checkoutsend = async () => {
  //儲存資料至orders
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const { error } = await supabase.from('orders').upsert({
    id: selectedDay.day.toISODate() + '-' + userData.auth.id,
    date: selectedDay.day.toISODate(),
    uuid: userData.auth.id,
    class: userData.data.class,
    number: userData.data.number,
    order: cart,
    payment: payment.value
  })
  if (error) {
    console.log(error)
    showToast(error, 'alert-error')
    return
  }

  clearCart()
  showToast('訂單已送出', 'alert-success')

  document.querySelector('#checkoutmodal').close()
}


const choosebot = () => {
  const main = products.value.data[getRandom(0,products.value.data.length)]
  addToCart(main)
}

const setComboMeal = (menu) =>{
  if (!menu.isOpenToday) {
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

function cartCount() {
  const obj = {}
  for (let food of cart) {
    if (!obj.hasOwnProperty(food.code)) {
      obj[food.code] = food
      obj[food.code].count = 0
    }
    obj[food.code].count ++
  }
  return obj
}

// toast
const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>