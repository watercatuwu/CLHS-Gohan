<template>
    <div v-if="isShowToast" class="toast toast-center z-50">
        <div class="alert" :class="[toastType]">
          <span>{{toastMsg}}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isShowToast = ref(false)
const toastType = ref('')
const toastMsg = ref('')
const showToast = (msg, type) => {
  isShowToast.value = true
  toastMsg.value = msg
  toastType.value = type
  setTimeout(() => {
    isShowToast.value = false
  }, 3000)
}

defineExpose({ showToast })
</script>