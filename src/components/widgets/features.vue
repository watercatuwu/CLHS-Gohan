<template>
  <div class="w-full p-10 bg-base-200">
    <div class="my-8 space-y-10">
      <h1 class="text-3xl font-bold">特色</h1>
      <div>
        <h2 class="text-2xl font-bold flex items-center"><eyeicon />瀏覽菜單</h2>
        <p class="text-lg">隨時線上瀏覽菜單，方便快捷，無需翻閱紙本菜單。</p>
        <!--table example-->
        <div class="card bg-base-100 shadow-md border-gray-400 border-2 mt-2">
          <div class="card-body">
              <h2 class="card-title text-xl"><shopicon />商品</h2>
              <div class="overflow-x-auto">
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
                      <tr class="border-0">
                        <th>1</th>
                        <td class="whitespace-nowrap">蔥燒肉片飯</td>
                        <td>75</td>
                        <td>
                          <button @click="toastRef.showToast('已加入購物車')" class="btn btn-secondary btn-sm whitespace-nowrap">加入</button>
                        </td>
                      </tr>
                      <tr class="border-0">
                        <th>①</th>
                        <td class="whitespace-nowrap">咔啦雞起司堡</td>
                        <td>60</td>
                        <td>
                          <button @click="toastRef.showToast('已加入購物車')" class="btn btn-secondary btn-sm whitespace-nowrap">加入</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
          </div>
      </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold flex items-center"><receipticon />查看訂單狀態</h2>
        <p class="text-lg">隨時掌握訂單進度，方便管理訂單。</p>
        <!--order example-->
        <div class="card bg-base-100 shadow-md border-gray-400 border-2 mt-2">
          <div class="card-body">
              <div class="flex justify-between">
                <h2 class="card-title text-xl">
                  <receipticon /> 我的訂單
                </h2>
              </div>
              <div class="overflow-x-auto max-h-72">
                  <table class="table">
                    <!-- head -->
                    <thead>
                      <tr class="border-0">
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>加飯</th>
                      </tr>
                    </thead>
                    <tbody v-show="ordersexample">
                      <tr class="border-0">
                        <th>1</th>
                        <td>香辣烤雞</td>
                        <td>75</td>
                        <td><checkcircleicon /></td>
                      </tr>
                      <tr class="border-0">
                        <th>①</th>
                        <td>起司雞排火腿吐司</td>
                        <td>55</td>
                        <td></td>
                      </tr>
                      <tr class="sticky bottom-0 bg-base-200">
                        <th></th>
                        <td>總計</td>
                        <td>130</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <div class="card-actions justify-end mt-2">
                <button @click="refreshOrders" class="btn btn-secondary btn-sm mx-1">重新整理</button>
                <button @click="cancelOrders" class="btn btn-error btn-sm mx-1">取消訂單</button>
              </div>
          </div>
      </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold flex items-center"><facegrinicon />自訂主題</h2>
        <p class="text-lg">自由設定主題，打造獨特點餐體驗。</p>
        <div class="card bg-base-100 shadow-md border-gray-400 border-2 mt-2">
          <div class="card-body">
            <div class="grid grid-cols-2 gap-4 items-center">
              <h2 class="text-xl">主題</h2>
              <themepicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <toast ref="toastRef" />
</template>

<script setup>
import shopicon from '@/assets/icons/store.svg'
import eyeicon from '@/assets/icons/eye.svg'
import carticon from '@/assets/icons/cart.svg'
import receipticon from '@/assets/icons/receipt.svg'
import facegrinicon from '@/assets/icons/face-grin.svg'
import checkcircleicon from '@/assets/icons/check-circle.svg'

import themepicker from '@/components/widgets/themepicker.vue'
import toast from '@/components/widgets/toast.vue'

import { ref } from 'vue'

const ordersexample = ref(true)
const toastRef = ref(null)

const refreshOrders = () => {
  toastRef.value.showToast('已重新整理')
  ordersexample.value = true
}

const cancelOrders = () => {
  toastRef.value.showToast('已取消訂單')
  ordersexample.value = false
}
</script>