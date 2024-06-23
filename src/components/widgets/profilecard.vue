<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <figure class="w-full h-3 bg-primary"></figure>
        <div class="card-body">
            <div class="card-actions justify-end">
                <button @click="logout" class="btn btn-sm btn-error">登出</button>
            </div>
            <div class="avatar">
                <div class="w-24 rounded-full">
                    <img :src="userData.auth.user_metadata.picture" />
                </div>
            </div>
            <h2 class="card-title text-xl">{{userData.auth.user_metadata.name}}</h2>
            <p class="text-gray-500">{{userData.auth.email}}</p>
            <div class="flex gap-2">
              <div v-for="(tag, index) in userData.data.tags" class="badge badge-primary text-base">{{tag}}</div>
              <div class="badge badge-neutral text-base">創建日期:{{DateTime.fromISO(userData.auth.created_at).toISODate()}}</div>
            </div>
        </div>
      </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { supabase } from '@/supabase'

const userData = JSON.parse(sessionStorage.getItem('userData'))
const router = useRouter()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  sessionStorage.clear()
  router.push('/')
  if (error) {
    console.log(error)
  }
};
</script>