<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><bullhornicon /> 公告</h2>
            <div v-if="isDataGet" v-for="(element, index) in annoucements"  class="collapse collapse-arrow">
                <input type="radio" name="my-collapse" :checked="index===0" />
                <div class="collapse-title text-xl font-medium">
                  {{ element.title }}
                </div>
                <div class="collapse-content">
                  <p>{{ element.content }}</p>
                  <p>發布日期:<span class="text-gray-500">{{ DateTime.fromISO(element.created_at).toFormat('yyyy-MM-dd HH:mm') }}</span></p>
                  <p>發布者:<span class="text-gray-500">{{ element.author }}</span></p>
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
  const { data, error } = await supabase.from('annoucements').select('*')
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