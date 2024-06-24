<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
      <figure class="w-full h-3 bg-primary"></figure>
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><bullhornicon /> 公告</h2>
            <div v-if="isDataGet" v-for="(element, index) in annoucements"  class="collapse collapse-arrow">
                <input type="radio" name="my-collapse" :checked="index===0" />
                <div class="collapse-title text-xl font-bold">
                  {{ element.title }}
                </div>
                <div class="collapse-content">
                  <p class="text-lg">{{ element.content }}</p>
                  <div class="text-sm text-gray-400">
                    <p>發布日期:{{ DateTime.fromISO(element.created_at).toFormat('yyyy-MM-dd HH:mm') }}</p>
                    <p>發布者:{{ element.author }}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script setup>
import bullhornicon from '@/assets/icons/bullhorn.svg'
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { supabase } from '@/supabase'

const annoucements = ref([])
const isDataGet = ref(true)

const getData = async () => {
  const { data, error } = await supabase.from('annoucements').select('*').order('created_at', { ascending: false }).limit(5)
  if (error) {
    console.log(error)
    return
  }
  annoucements.value = data
}

onMounted(() => {
  if (Object.keys(annoucements.value).length === 0) {
    getData()
  }else{
    isDataGet.value = true
  }
})

</script>