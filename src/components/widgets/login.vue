<template>
  <toast ref="toastRef"/>
    <button type="button" class="btn btn-primary shadow-lg shadow-primary disabled:shadow-none" @click="signInGoogle" :disabled="loading">
      <googleicon />SignIn with Google
      <span class="loading loading-spinner loading-sm" v-if="loading"></span>
    </button>
</template>

<script setup>
import googleicon from '@/assets/icons/google.svg'

import toast from '@/components/widgets/toast.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/supabase'

const router = useRouter()

onMounted(async() => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    router.push('/callback')
  }
})


const loading = ref(false)

const signInGoogle = async() => {
  loading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://${window.location.hostname}/callback`,
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

// toast
const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>