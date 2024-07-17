<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <figure class="w-full h-3 bg-primary"></figure>
        <div class="card-body">
          <div>
            <input v-if="userData.data.stuid !== '000000'" id="avatarinput" @change="uploadAvatar" type="file" accept="image/png, image/jpeg, image/gif" class="hidden" />
            <div @click="chooseAvatar" class="cursor-pointer tooltip" data-tip="更換頭像">
              <span class="absolute inset-0 flex items-center justify-center rounded-full z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50"><icon name='camera'/></span>
              <div v-if="avatarUrl!==null" class="avatar">
                <div class="w-24 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <img :src="avatarUrl" />
                </div>
              </div>
              <div v-else class="avatar placeholder">
                <div class="bg-neutral text-neutral-content w-24 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <span class="text-3xl items-center">{{userData.auth.user_metadata.name.slice(-1)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class='flex items-center'>
            <h2 class="card-title text-xl">{{userData.auth.user_metadata.name}}</h2>
            <div class="tooltip tooltip-right" data-tip="複製UUID">
              <button @click='copyUUID' class='btn btn-ghost btn-sm'><icon name='copy'/></button>
            </div>
          </div>
          <div class='flex flex-col gap-0'>
            <p class="opacity-50">{{userData.auth.email}}</p>
          </div>
          <div class="flex gap-2">
            <div class="badge badge-primary text-base">{{userData.data.role}}</div>
            <div class="badge badge-neutral text-base">創建日期:{{DateTime.fromISO(userData.auth.created_at).toISODate()}}</div>
          </div>
        </div>
      </div>
      <toast ref="toastRef"/>
</template>

<script setup>
import icon from '@/components/widgets/icon.vue'

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { supabase } from '@/supabase'
import Compressor from 'compressorjs'
import { v4 as uuidv4 } from 'uuid';
import { getUserAvatar } from '@/utils/supabase';

import toast from '@/components/widgets/toast.vue'

const userData = JSON.parse(sessionStorage.getItem('userData'))
const hasAvatar = ref(false)
const avatarUrl = ref('')
const router = useRouter()
const toastRef = ref(null)

onMounted(async () => {
  avatarUrl.value = await getUserAvatar()
})

const chooseAvatar = () => {
  document.getElementById('avatarinput').click()
}

const uploadAvatar = async () => {
  let avatarFile = document.getElementById('avatarinput').files[0]
  if (['image/png', 'image/jpeg', 'image/gif'].includes(avatarFile.type)){
    if (['image/png', 'image/jpeg'].includes(avatarFile.type)) {
      new Compressor(avatarFile, {
        quality: 0.6,
        maxWidth: 256,
        maxHeight: 256,
        success(result) {
          console.log(avatarFile)
          avatarFile = result
          console.log(avatarFile)
        },
        error(err) {
          console.error(err.message)
          toastRef.value.showToast('圖片壓縮失敗', 'alert-error')
        }
      })
    }
    console.log(avatarFile.type.replace('image/', ''))
    const fileName = uuidv4()
    const extensionName = avatarFile.type.replace('image/', '')
    const fullFileName = `${fileName}.${extensionName}`

    const {data:{avatar}} = await supabase
      .from('users')
      .select('avatar')
      .eq('uuid', userData.auth.id)
      .single()

    const { error: removeError } = await supabase
      .storage
      .from('avatars')
      .remove([avatar])

    if (removeError) {
      console.log(removeError)
    }

    const { data:dbData, error: dbError } = await supabase
      .from('users')
      .update({ avatar: fullFileName })
      .eq('uuid', userData.auth.id)

    if (dbError) {
      console.log(dbError)
    }

    const { data, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(fullFileName, avatarFile, {
        cacheControl: '3600',
        upsert: true
      })
    if (uploadError) {
      console.log(uploadError)
      toastRef.value.showToast(uploadError.message, 'alert-error')
    } else {
      avatarUrl.value = await getUserAvatar() //更新頭像
      toastRef.value.showToast('上傳成功', 'alert-success')
    }
  } else {
    toastRef.value.showToast(`圖片格式錯誤(${avatarFile.type})`, 'alert-error')
  }
}

const copyUUID = () => {
  const userUID = userData.auth.id
  navigator.clipboard.writeText(userUID)
    .then(() => toastRef.value.showToast('複製成功'), 'alert-success')
    .catch(() => toastRef.value.showToast('複製失敗'), 'alert-error')
}
</script>