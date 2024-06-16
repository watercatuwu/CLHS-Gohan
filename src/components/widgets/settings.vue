<template>
      <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><settingsicon />個人設定</h2>
                <div class="grid grid-cols-2 gap-4 items-center">
                    <h2 class="text-xl">主題</h2>
                    <div class="dropdown dropdown-top dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-primary w-full">選擇</div>
                        <ul tabindex="0" class="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><input v-for="theme in themelist" @click="setTheme(theme)" type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme" :value="theme"/></li>
                        </ul>
                    </div>
                    <h2 class="text-xl">背景圖片</h2>
                    <button class="btn btn-secondary w-full" @click="showbgmodal">設定</button>
                    <dialog id="bgmodal" class="modal">
                        <div class="modal-box space-y-2">
                            <h3 class="font-bold text-lg">輸入圖片網址</h3>
                            <label class="input input-bordered flex items-center gap-2">
                                <input v-model="imgurl" type="text" placeholder="Type here" class="grow" />
                                <button @click="imgurl=''"><trashbinicon /></button>
                            </label>
                            <h3 class="font-bold text-lg">卡片透明度</h3>
                            <div class="flex">
                                <input v-model="cardopacity" type="range" min="0" max="100" step="10" class="range" />
                                <span class="mx-4">{{ cardopacity }}</span>
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">關閉</button>
                                    <button @click="setbg" class="btn btn-success">送出</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
        </div>
      </div>
</template>
<script setup>
import settingsicon from '@/assets/icons/settings.svg'
import trashbinicon from '@/assets/icons/trashbin.svg'

import { ref } from 'vue'

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

const themelist = [
    'Default',
    "winter",
    "lofi",
    "black",
    "valentine",
    "cupcake",
    "bumblebee",
    'Cappuccino',
    'Mocha'
]

const imgurl = ref(localStorage.getItem('imgurl')||'')
const cardopacity = ref(parseInt(localStorage.getItem('cardopacity'))||80)
const showbgmodal = () => {
    document.getElementById('bgmodal').showModal()
}

const setbg = () => {
    localStorage.setItem('imgurl', imgurl.value)
    localStorage.setItem('cardopacity', cardopacity.value)
    const app = document.querySelector('#main')
    app.style.backgroundImage = `url(${imgurl.value})`
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.classList.add(`bg-opacity-${cardopacity.value}`)
    })
    document.getElementById('bgmodal').close()
}
</script>