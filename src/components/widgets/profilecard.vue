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
            <div v-if="userdata.tags" class="flex gap-2">
                <div v-for="(tag, index) in userdata.tags" class="badge badge-neutral text-base">{{tag}}</div>
            </div>
        </div>
      </div>
</template>

<script setup>
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

const currentUser = ref(JSON.parse(sessionStorage.getItem('currentUser')))
const userdata = ref(JSON.parse(sessionStorage.getItem('userdata')))

const router = useRouter()
const auth = useFirebaseAuth()

const handlelogout = async () => {
  try {
    await signOut(auth)
    sessionStorage.clear()
    await router.push('/');
  } catch (error) {
    console.log(error);
  }
};
</script>