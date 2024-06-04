<script>
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
	hd: 'student.clhs.tyc.edu.tw',
	});
</script>

<script setup>
import googleicon from '@/assets/icons/google.svg'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  getRedirectResult,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth() // only exists on client side
const router = useRouter()

// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider)
    .catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

// only on client side
onMounted(() => {
  getRedirectResult(auth)
  .then((result) => {
      if (result.user) {
        const currentUser = result.user;
        console.log(currentUser);
        router.push('/profile');
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    })
  .catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})

function demo() {
  const demoUser = {
    displayName: 'demo',
    email: 'demo',
    photoURL: 'https://i.meee.com.tw/F0yc64K.png',
    uid: 'demo',
  }
  sessionStorage.setItem('currentUser', JSON.stringify(demoUser))
  router.push('/profile')
}
</script>

<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body">
            <div class="avatar">
            </div>
            <h2 class="card-title text-2xl my-2">LunCLHS NEXT</h2>
            <div class="card-actions justify-center">
                <button type="button" class="btn btn-primary my-2 btn-wide" @click="signinRedirect()"><googleicon />SignIn with Google</button>
            </div>
            <div class="card-actions justify-center">
                <button type="button"  class="link my-2" @click="demo">demo</button>
            </div>
        </div>
      </div>
</template>