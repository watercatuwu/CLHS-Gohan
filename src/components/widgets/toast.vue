<template>
  <Transition name='toast-fade'>
    <div v-if="isShowToast" class="toast toast-center z-50">
        <div class="alert gap-0" :class="[toastType]">
          <span class="text-center">{{toastMsg}}</span>
        </div>
    </div>
  </Transition>
</template>

<script setup>
import { Transition, ref } from 'vue'

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

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
</style>