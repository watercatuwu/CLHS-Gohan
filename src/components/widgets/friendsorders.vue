<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="flex flex-row gap-4 overflow-x-auto">
                <div v-for="f in friends" @click="show" class="cursor-pointer">
                    <div class="flex flex-col items-center">
                        <div class="card w-24 h-16 bg-base-300 shadow-md my-2 flex items-center justify-center">
                            <p class="text-lg text-center p-2 truncate whitespace-normal">{{f.status}}</p>
                        </div>
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img :src="f.avatar" />
                            </div>
                        </div>
                        <p class="mt-2 text-center">{{f.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'

const friends = [
    { name: 'Alice', avatar: 'https://picsum.photos/id/238/200', status:'	韓式肉片'},
    { name: 'Bob', avatar: 'https://picsum.photos/id/239/200', status:'卡拉雞'},
    { name: 'Charlie', avatar: 'https://picsum.photos/id/240/200', status:'黑胡椒醬香雞薯餅吐司'},
];

friends.sort((a, b) => (a.status !== '' ? -1 : 1));


</script>