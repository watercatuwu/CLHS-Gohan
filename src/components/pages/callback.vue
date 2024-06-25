<template>
    <div class="hero bg-base-100 bg-opacity-80 min-h-[100dvh]">
        <div class="container mx-auto p-2">
            <div class="card bg-base-200 shadow-md border-gray-400">
                <div class="card-body">
                    <div class="flex justify-center">
                        <div class="loading loading-spinner loading-lg text-center"></div>
                    </div>
                    <p class="text-xl text-center">登入中</p>
                </div>
            </div>
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
    //檢查用戶資料是否存在
    const { data: existedData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', user.id)
      .single()

    if (fetchError){
      //建立新用戶
      if (fetchError.code === 'PGRST116' ) {
        const name = user.user_metadata.name
        const classAndNumber = name.slice(0, 6).split('.')
        const { error } = await supabase.from('users').insert([{
          uuid: user.id,
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
    } else {
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