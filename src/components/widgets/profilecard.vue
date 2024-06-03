<template>
    <div class="card bg-base-300 shadow-md border-gray-400">
        <figure class="w-full h-3 bg-primary"></figure>
        <div class="card-body">
            <div class="card-actions justify-end">
                <button @click="handlelogout" class="btn btn-sm btn-error">登出</button>
            </div>
            <div class="avatar">
                <div class="w-24 rounded-full">
                    <img :src="currentUser.photoURL" />
                </div>
            </div>
            <h2 class="card-title text-xl">{{currentUser.displayName}}</h2>
            <p class="text-gray-500">{{currentUser.email}}</p>
            <div class="flex gap-2">
                <div class="badge badge-primary text-base">熱食部會員</div>
                <div class="badge badge-secondary text-base">uwub</div>
            </div>
        </div>
      </div>
</template>

<script setup>
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

const currentUser = ref(JSON.parse(sessionStorage.getItem('currentUser')))
const router = useRouter()

const auth = useFirebaseAuth()

const handlelogout = () => {
    signOut(auth)
    .then(function(){
        sessionStorage.removeItem('currentUser')
        router.push('/login')
     })
    .catch(function(error) {
        console.log(error)
    });
};
</script>