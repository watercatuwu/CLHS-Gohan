<template>
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
            <div tabindex="0" role="button"  class="btn m-1">更換表格類型</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
            <li @click="tableType = 'stu'"><a>學生排序</a></li>
            <li @click="ordersCount"><a>餐點排序</a></li>
            </ul>
        </div>
    </div>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <!--stutable-->
            <table v-if="tableType == 'stu'" class="table">
              <thead>
                <tr>
                  <th>座號</th>
                  <th>餐點</th>
                  <th>金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in table">
                  <th>{{t.number}}</th>
                  <td>{{getordercode(t.order)}}</td>
                  <td>{{priceSum(t.order)}}</td>
                </tr>
              </tbody>
            </table>

            <!--foodtable-->
            <table v-if="tableType == 'food'" class="table">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon';
import { supabase } from '@/supabase'

const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now
const products = ref([])

const table = ref([])
const tableType = ref("stu")

const fetchDatas = async () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const { data, error } = await supabase.from('orders').select('*')
  .eq('date', sysNow.toISODate()).eq('class', userData.data.class)
  if (error) {
    console.log(error)
    return
  }
  table.value = data
  console.log(data)
}

onMounted(() => {
  fetchDatas()
})

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

const priceSum = (arr) =>{
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    return sum
}

const ordersCount = () => {
    const obj = {}
    console.log(table.value)
    for (let t of table.value) {
      t.order.forEach((orderfood) => {
        console.log(orderfood)
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
    tableType.value = "food"
    console.log(products.value)
}
</script>