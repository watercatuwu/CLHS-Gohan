<template>
    <dayselect @update="updateDatas" />
    <div class="card bg-base-200 shadow-md border-gray-400">
      <figure class="w-full h-3 bg-primary"></figure>
      <div class="card-body">
        <div class="stats stats-vertical lg:stats-horizontal bg-opacity-0">
            <div class="stat">
            <div class="stat-title">點餐人數</div>
            <div class="stat-value">{{ table.length }}</div>
            </div>
            <div class="stat">
            <div class="stat-title">餐點數</div>
            <div class="stat-value">{{ getfoodamount(table) }}</div>
            </div>
            <div class="stat">
            <div class="stat-title">總金額</div>
            <div class="stat-value">{{ getfoodtotalprice(table) }}</div>
            </div>
        </div>
      </div>
    </div>
    <div class="flex flex-between">
        <div class="dropdown">
            <div tabindex="0" role="button"  class="btn m-1">切換表格類型</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
            <li @click="stuOrder"><a>學生排序</a></li>
            <li @click="foodOrder"><a>餐點排序</a></li>
            </ul>
        </div>
    </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <!--stutable-->
            <table v-if="tableType == 'stu'" class="table table-zebra">
              <thead>
                <tr>
                  <th>座號</th>
                  <th>餐點</th>
                  <th>金額</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in table">
                  <th>{{t.number}}</th>
                  <td>{{getordercode(t.order)}}</td>
                  <td>{{priceSum(t.order)}}</td>
                  <td>
                    <button @click="setpay(t.id)" class="btn btn-sm btn-primary" :disabled="t.isPay">{{paidmsg(t.isPay)}}</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!--foodtable-->
            <table v-else class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>餐點</th>
                    <th>正常</th>
                    <th>加飯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, key) of products">
                    <th>{{key}}</th>
                    <td>{{value.name}}</td>
                    <td>{{value.amount}}</td>
                    <td>{{value.addriceAmount}}</td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
    <toast ref="toastRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon';
import { supabase } from '@/supabase'
import { priceSum } from '@/utils/utils'
import { selectedDay } from '@/reactive/cart'

import dayselect from '@/components/widgets/dayselect.vue'
import toast from '@/components/widgets/toast.vue'

const products = ref([])

const table = ref([])
const tableType = ref("stu")

const toastRef = ref(null)

const fetchDatas = async () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const { data, error } = await supabase.from('orders').select('*')
  .eq('date', selectedDay.day.toISODate()).eq('class', userData.data.class)
  if (error) {
    console.log(error)
    return
  }
  table.value = data
}

onMounted(() => {
  fetchDatas()
})

const updateDatas = async() => {
  await fetchDatas()
  ordersCount()
}

const getordercode = (order) => {
    const arr = []
    for(let food of order){
      if (food.addrice){
        arr.push(food.code+"+")
      }else{
        arr.push(food.code)
      }
    }
    return arr.join(',') // 陣列轉字串並返回
}

const getfoodamount = (table) => {
    let counter = 0
    for (let t of table) {
        counter += t.order.length
    }
    return counter
}

const getfoodtotalprice = (table) => {
    let sum = 0
    for (let t of table) {
        sum += priceSum(t.order)
    }
    return sum
}

const stuOrder = () =>{
  tableType.value = "stu"
}

const foodOrder = () =>{
  tableType.value = "food"
  ordersCount()
}

const ordersCount = () => {
    const obj = {}
    for (let t of table.value) {
      t.order.forEach((orderfood) => {
        if (!obj.hasOwnProperty(orderfood.code)) {
          obj[orderfood.code] = orderfood
          obj[orderfood.code].addriceAmount = 0
          obj[orderfood.code].amount = 0
        }
        if (orderfood.addrice){
          obj[orderfood.code].addriceAmount ++
        }else{
          obj[orderfood.code].amount ++
        }
      })
    }
    products.value = obj
}

const paidmsg = (isPay) => {
  return isPay ? "已付款" : "未付款"
}

const setpay = async (id) => {
  const {error} = await supabase.from('orders').update({isPay: true}).eq('id', id)
  if (error){
    console.log(error)
    return
  }
  updateDatas()
  toastRef.value.showToast('已付款', 'alert-success')
}
</script>