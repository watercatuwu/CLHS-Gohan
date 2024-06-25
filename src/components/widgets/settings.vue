<template>
      <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><settingsicon />個人設定</h2>
                <div class="grid grid-cols-2 gap-4 items-center">
                    <h2 class="text-xl">主題</h2>
                    <themepicker />
                    <h2 class="text-xl">個人化</h2>
                    <button class="btn btn-secondary w-full" @click="showbgmodal">設定</button>
                    <dialog id="bgmodal" class="modal">
                        <div class="modal-box space-y-2">
                            <h3 class="text-lg">背景圖片</h3>
                            <input id="bginput" type="file" class="file-input file-input-bordered w-full" />
                            <div class="py-2">
                                <h3 class="text-lg">卡片透明度</h3>
                                <div class="flex py-4">
                                    <input v-model="cardopacity" type="range" min="0" max="100" step="10" class="range" />
                                    <span class="mx-4">{{ cardopacity }}</span>
                                </div>
                            </div>
                            <div class="flex justify-between py-2 items-center">
                                <h3 class="text-lg">卡片毛玻璃</h3>
                                <input v-model="cardglass" type="checkbox"  class="checkbox mx-4" />
                            </div>
                            <div class="modal-action">
                                <form method="dialog" class="space-x-2">
                                    <button class="btn">關閉</button>
                                    <button @click="setbg" class="btn btn-success">送出</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
        </div>
      </div>
      <toast ref="toastRef"/>
</template>
<script setup>
import settingsicon from '@/assets/icons/settings.svg'
import trashbinicon from '@/assets/icons/trashbin.svg'
import toast from '@/components/widgets/toast.vue'
import themepicker from '@/components/widgets/themepicker.vue'

import { ref } from 'vue'

const toastRef = ref(null)

const cardopacity = ref(parseInt(localStorage.getItem('cardopacity'))||50)
const oldcardopacity = ref(parseInt(localStorage.getItem('cardopacity'))||50)
const cardglass = ref(localStorage.getItem('cardglass')|| false)

const showbgmodal = () => {
    document.getElementById('bgmodal').showModal()
}

const setbg = () => {
    const img = document.getElementById('bginput').files[0]
    console.log(img)
    const reader = new FileReader();

    reader.onload = function(event) {
        const base64String = event.target.result;
        localStorage.setItem('img', base64String)
        const bg = document.querySelector('#bg')
        bg.style.backgroundImage = `url(${base64String})`
    };

    reader.readAsDataURL(img)

    localStorage.setItem('cardopacity', cardopacity.value)
    localStorage.setItem('cardglass', cardglass.value)
    //cards
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.classList.remove(`bg-opacity-${oldcardopacity.value}`)
        card.classList.add(`bg-opacity-${cardopacity.value}`)
        card.classList.toggle('backdrop-blur-sm', cardglass.value)
    })

    toastRef.value.showToast('設定已儲存', 'alert-success')
}
</script>