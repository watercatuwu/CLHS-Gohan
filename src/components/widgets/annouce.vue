<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><bullhornicon /> 公告</h2>
            <div v-if="isDataGet" v-for="(value, key, index) in annoucements" :key="key"  class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-collapse" :checked="index===0" />
                <div class="collapse-title text-xl font-medium">
                  {{ Object.keys(value)[0] }}
                </div>
                <div class="collapse-content">
                  <p>{{ value[Object.keys(value)[0]] }}</p>
                  <p>發布日期:<span class="text-gray-500">{{ key }}</span></p>
                </div>
            </div>
        </div>
      </div>
</template>

<script setup>
import bullhornicon from '@/assets/icons/bullhorn.svg'
import { ref, onMounted } from 'vue'
import { doc, getDocs, query, } from 'firebase/firestore'
import { DateTime } from 'luxon'
import { annoucementRef } from '@/firebase'

const annoucements = ref(JSON.parse(sessionStorage.getItem('annoucements'))||{})
const isDataGet = ref(false)
const q = query(annoucementRef)

const getData = async () => {
  try{
  const data = await getDocs(q)
  if(data){
    data.forEach((doc) => {
      annoucements.value[doc.id] = doc.data()
    });
    annoucements.value = Object.entries(annoucements.value)
      .sort(([key1], [key2]) => new Date(key2) - new Date(key1))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    sessionStorage.setItem('annoucements', JSON.stringify(annoucements.value))
    isDataGet.value = true
    }else{
    console.log('data null')
    }
  }
  catch(error){
    console.log(error)
  }
}

onMounted(() => {
  if (Object.keys(annoucements.value).length === 0) {
    getData()
  }else{
    isDataGet.value = true
  }
})

</script>