<template>
  <div class="hero bg-base-100 bg-opacity-80 min-h-[100dvh]">
    <div class="flex justify-center items-center gap-4">
        <div class="loading loading-spinner text-center"></div>
        <p class="text-lg text-center">登入中</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async() => {
  const { data: { user } } = await supabase.auth.getUser()
  let data = {}
  // 檢查是否登入
  if (user) {
    const name = user.user_metadata.name
    const classAndNumber = name.slice(0, 6).split('.')
    //檢查用戶資料是否存在
    const { data: existedData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', user.id)
      .single()

    if (fetchError){
      console.log('new')
      //建立新用戶
      if (fetchError.code === 'PGRST116' ) {
        const { error } = await supabase.from('users').insert([{
          uuid: user.id,
          name: name,
          class: classAndNumber[0],
          number: classAndNumber[1],
          stuid: user.email.slice(1,7),
          tags: ['熱食部會員'],
        }])
        if (error) {
          console.log(error)
          router.push('/')
          return
        }
      } else{
        console.log(fetchError)
        router.push('/')
        return
      }

      //再次取得用戶資料
      const { data: newData, error } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', user.id)
      .single()

      if (error) {
        console.log(error)
        router.push('/')
        return
      }

      data = newData
    } else if(existedData.class!==classAndNumber[0] || existedData.number!==classAndNumber[1]) {
      console.log('update')
      //檢查用戶資料是否更改(class&number)
      const { error:updateError } = await supabase.from('users')
        .update({
          class: classAndNumber[0],
          number: classAndNumber[1]
        })
        .eq('uuid', user.id)

      if (updateError){
        console.log(updateError)
        router.push('/')
        return
      }
      //再次取得資料
      const { data: newData, error:fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', user.id)
      .single()

      if (fetchError) {
        console.log(fetchError)
        router.push('/')
        return
      }

      data = newData
    } else {
      //用戶資料存在且無變動
      console.log('existed')
      data = existedData
    }

    const userData = {
      auth: user,
      data: data
    }
    sessionStorage.setItem('userData', JSON.stringify(userData))

    router.push('/profile')
  } else {
    router.push('/')
  }
})
</script>