<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
        <div class="stats stats-vertical lg:stats-horizontal bg-base-200">
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
            <table v-if="tableType == 'stu'" class="table table-zebra">
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
            <table v-if="tableType == 'food'" class="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>餐點</th>
                    <th>數量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products">
                    <th>{{product.code}}</th>
                    <td>{{product.name}}</td>
                    <td>{{product.amount}}</td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { DateTime } from 'luxon';
import {doc, getDoc, getDocs, setDoc, query, where} from 'firebase/firestore'
import { usersRef, ordersRef, menuRef } from '@/firebase'

const now = DateTime.now().setZone('Asia/Taipei')
const products = JSON.parse(sessionStorage.getItem('products')) === null ? ref([]) : ref(JSON.parse(sessionStorage.getItem('products')).data)
const newproducts = ref([])

const isDataGet = ref(false)
const table = ref([])
const tableType = ref("stu")

const clas = ref(JSON.parse(sessionStorage.getItem('userdata')).class)

const getFirestore = async (collectionRef, docid) => {
  const docRef = doc(collectionRef, docid)
  const docsnap = await getDoc(docRef)
  return docsnap.data()
}

const weekinyear = now.year.toString()+now.weekNumber.toString()

if (products.value.length === 0) {
  getFirestore(menuRef,weekinyear)
  .then(data => {
    let weekday = now.hour>13 ? now.plus({days: 1}).setLocale('en').weekdayShort.toLowerCase() : now.setLocale('en').weekdayShort.toLowerCase()
    //設定表單更新時間
    const result = data[weekday]
    sessionStorage.setItem('products', JSON.stringify(result))
    console.log(result)
    isDataGet.value = true
    products.value = result.data
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error)
})
}else{
  isDataGet.value = true
}

const fetchDatas = async () => {
  try {
    console.log(now.toISODate())
    getFirestore(ordersRef, now.toISODate())
    .then(data => {
      console.log(data)

    })
  } catch (error) {
    console.log('查詢文件時出錯：', error);
  }
}

fetchDatas()

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
    let counter = {}
    for (let t of table.value) {
        t.order.forEach((food) => {
            counter[food.code] = (counter[food.code] || 0) + 1
        })
    }

    //此段待改太亂了
    //生成新的products
    //刪除無效的商品
    for (let i = 0; i < products.value.length; i++) {
        let product = products.value[i]
        if (product.code in counter) {
            product.amount = counter[product.code]
        }else{
            products.value.splice(i, 1);
            i--; // 由於刪除了一個元素，需要將索引減1
        }
    }
    tableType.value = "food"
}
</script>