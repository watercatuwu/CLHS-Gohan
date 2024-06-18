<template>
    <div class="w-full p-10 bg-base-200">
        <div class="my-8 space-y-10">
          <h1 class="text-3xl font-bold">特色</h1>
          <div>
            <h2 class="text-2xl font-bold flex items-center"><eyeicon />瀏覽菜單</h2>
            <p class="text-lg">隨時線上瀏覽菜單，方便快捷，無需翻閱紙本菜單。</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold flex items-center"><receipticon />查看訂單狀態</h2>
            <p class="text-lg">隨時掌握訂單進度，方便管理訂單。</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold flex items-center"><facegrinicon />自訂主題</h2>
            <p class="text-lg">自由設定主題，打造獨特點餐體驗。</p>
            <div class="dropdown dropdown-top">
              <div tabindex="0" role="button" class="btn btn-sm btn-primary m-1">選擇主題</div>
              <ul tabindex="0" class="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><input v-for="theme in themelist" @click="setTheme(theme)" type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme" :value="theme"/></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import eyeicon from '@/assets/icons/eye.svg'
import carticon from '@/assets/icons/cart.svg'
import receipticon from '@/assets/icons/receipt.svg'
import facegrinicon from '@/assets/icons/face-grin.svg'

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

const themelist = [
    'Husky',
    'Mocha',
    'Cappuccino',
    "winter",
    'Default',
    "valentine",
]
</script>