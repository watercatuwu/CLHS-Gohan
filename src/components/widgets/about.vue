<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-xl"><infoicon /> 關於</h2>
            <p class="text-lg">LunCLHS是由watercatuwu開發的點餐系統，尚在開發中...</p>
            <p class="text-lg">前端框架使用DaisyUI和Vue開發，後端資料庫為Firebase Firestore及Firebase Auth</p>
            <p class="text-lg">部署於Firebase Hosting，開發完成將會開源於GitHub</p>
            <a href="https://github.com/watercatuwu" class="link text-lg">My Github</a>
        </div>
      </div>
</template>

<script setup>
import infoicon from '@/assets/icons/info.svg'

import { ref } from 'vue'
</script>