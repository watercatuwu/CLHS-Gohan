<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><fireicon /> 熱門商品</h2>
            <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr class="border-0">
                      <th></th>
                      <th>Name</th>
                      <th>Times</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in products" class="border-0">
                      <th>{{index+1}}</th>
                      <td>{{product.name}}</td>
                      <td>{{product.count}}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import fireicon from '@/assets/icons/fire.svg'

import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { supabase } from '@/supabase'

const products = ref([])

const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now

const fetchDatas = async () => {
  const { data, error } = await supabase.from('statstics').select('*').eq('date', sysNow.toISODate()).order('count', { ascending: false }).limit(5)
  console.log(data)
  products.value = data
}

onMounted(()=>{fetchDatas()})
</script>