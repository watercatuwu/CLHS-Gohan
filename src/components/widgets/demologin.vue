<template>
    <toast ref="toastRef"/>
      <button type="button" class="btn btn-neutral" @click="signInDemo" :disabled="loading">
            Try DEMO
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

  const loading = ref(false)


  const signInDemo = async() => {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo',
    })
    if(error){
      showToast(error.message, 'alert-error')
      console.error(error)
    }
    router.push('/callback')
  }

  // toast
  const toastRef = ref(null)
  function showToast(msg, type) {
    toastRef.value.showToast(msg, type)
  }
  </script>