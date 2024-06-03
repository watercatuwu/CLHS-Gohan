<script>
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
		hd: 'clhs.tyc.edu.tw',
	});
</script>

<script setup>
import googleicon from '@/assets/icons/google.svg'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  getRedirectResult,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth() // only exists on client side
const router = useRouter()

// display errors if any
const error = ref(null)
function signinRedirect() {
    signInWithPopup(auth, googleAuthProvider)
    .then(data =>{
        router.push('/profile')
        const currentUser = useCurrentUser()
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    })
    .catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

// only on client side
onMounted(() => {
  getRedirectResult(auth)
  .catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})

const demo = () => {
  router.push('/profile')
  const demoUser = {
    displayName: 'demo',
    email: 'demo',
    photoURL: 'https://i.meee.com.tw/F0yc64K.png',
    uid: 'demo',
  }
  sessionStorage.setItem('currentUser', JSON.stringify(demoUser))
}
</script>

<template>
    <ErrorBox v-if="error" :error="error" />
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-2xl my-2">LunCLHS NEXT</h2>
            <div class="card-actions justify-center">
                <button class="btn btn-primary my-2 btn-wide" @click="signinRedirect()"><googleicon />SignIn with Google</button>
            </div>
            <div class="card-actions justify-center">
                <button class="link my-2" @click="demo()">demo</button>
            </div>
        </div>
      </div>
</template>