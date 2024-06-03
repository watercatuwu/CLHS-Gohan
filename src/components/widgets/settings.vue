<template>
      <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <h2 class="card-title text-xl"><settingsicon />個人設定</h2>
            <table class="table text-lg">
                <tr>
                    <td>主題</td>
                    <td>
                        <div class="dropdown dropdown-top">
                            <div tabindex="0" role="button" class="btn m-1">選擇</div>
                            <ul tabindex="0" class="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><input v-for="theme in themelist" @click="setTheme(theme)" type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme" :value="theme"/></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
      </div>
</template>
<script setup>
import settingsicon from '@/assets/icons/settings.svg'

import { ref } from 'vue'

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

const themelist = ['Default', 'light', 'nord', 'valentine', 'Cappuccino', 'Mocha']
</script>