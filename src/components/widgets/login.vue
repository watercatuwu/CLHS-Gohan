<template>
  <toast ref="toastRef"/>
  <div class="flex flex-col justify-center gap-3">
    <button type="button" class="btn btn-primary mx-2" @click="signInGoogle" :disabled="loading">
      <googleicon />SignIn with Google
      <span class="loading loading-spinner loading-sm" v-if="loading"></span>
    </button>
  </div>
</template>

<script setup>
import googleicon from '@/assets/icons/google.svg'

import toast from '@/components/widgets/toast.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/supabase'

const router = useRouter()

const loading = ref(false)

const signInGoogle = async() => {
  loading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams:{
        prompt: 'select_account',
        hd: 'student.clhs.tyc.edu.tw',
      }
    }
  })
  if(error){
    showToast(error.message, 'alert-error')
    console.error(error)
  }
}

onMounted(async() => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', user.id)
      .single()
    if (error){
      if (error.code === 'PGRST116' ) {
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
        }
      } else{
        console.log(error)
      }
    }
    const userData = {
      auth: user,
      data: data
    }
    sessionStorage.setItem('userData', JSON.stringify(userData))
    router.push('/profile')
  }
})

// toast
const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>