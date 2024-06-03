<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><fireicon /> 熱門商品</h2>
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Times</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in newproducts">
                      <th>{{index+1}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.times}}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import fireicon from '@/assets/icons/fire.svg'

import { ref } from 'vue'

const products = ref([{name: "銅馬", times:10},{name: "銅馬", times:20},{name: "銅馬", times:50}])

const numdescending = (a,b) =>{
  return b.times - a.times
}

const newproducts = products.value.sort(numdescending)
</script>