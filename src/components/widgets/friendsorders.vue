<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="flex flex-row gap-4 overflow-x-auto">
                <div v-for="friend in friends" @click="show" class="cursor-pointer">
                    <div class="flex flex-col items-center">
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img :src="friend.avatarurl" />
                            </div>
                        </div>
                        <p class="mt-2 text-center">{{friend.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import { getFriend } from '@/utils/supabase';

const friends = ref([])

onMounted(()=>{
    fetchFriend()
})

const fetchFriend = async() => {
    friends.value = await getFriend()
}
</script>