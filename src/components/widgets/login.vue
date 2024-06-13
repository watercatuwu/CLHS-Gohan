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

import toast from '@/components/widgets/toast.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { usersRef } from '@/firebase'

const auth = useFirebaseAuth()
const router = useRouter()

const loading = ref(false)

function signInPopup() {
  loading.value = true
  showToast('登入中', 'alert-info')
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      if (result.user) {
        const currentUser = result.user;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        getDoc(doc(usersRef, currentUser.uid))
          .then((data) => {
            if (!data.exists()) {
                const displayName = currentUser.displayName
                const classAndNumber = displayName.slice(0, 6).split('.')
                const data = {
                  class: classAndNumber[0],
                  number: classAndNumber[1],
                  id: currentUser.email.slice(1,7),
                  tags: ['熱食部會員'],
                  uid: currentUser.uid,
                }
              setDoc(doc(usersRef, currentUser.uid), data)
              sessionStorage.setItem('userdata', JSON.stringify(data));
            }else{
              sessionStorage.setItem('userdata', JSON.stringify(data.data()));
            }
          })
        showToast('登入成功', 'alert-success')
        router.push({ name: 'profile' });
      }
    })
    .catch((reason) => {
      console.error('Failed signinRedirect', reason)
      showToast('登入失敗', 'alert-error')
    })
    .finally(() => {
      loading.value = false
    })
}

function demo() {
  const demoUser = {
    displayName: 'demo',
    email: 'demo',
    photoURL: '/static/logo.png',
    uid: 'demo',
  }
  const demoUserdata = {
    class: 'demo',
    number: 'demo',
    id: 'demo',
    tags: ['熱食部會員'],
    uid: 'demo',
  }
  const demoProducts = {"data":[{"name":"橙汁排骨","price":75,"code":1},{"price":75,"code":2,"name":"墨西哥烤雞"},{"name":"蒜泥蒸魚","code":3,"price":75},{"price":70,"name":"壽喜燒燴飯","code":4},{"price":65,"name":"蔬食便當","code":5},{"name":"榨菜肉絲麵","price":70,"code":6},{"name":"義大利肉醬麵","code":7,"price":75},{"price":65,"code":8,"name":"鍋貼"},{"code":"①","price":60,"name":"嫩煎雞腿起司堡"},{"price":55,"code":"②","name":"起司雞排火腿吐司"},{"code":"③","name":"無骨雞排蛋餅捲","price":55},{"name":"紅茶","code":"A","price":20},{"name":"綠茶","price":20,"code":"B"},{"price":30,"code":"C","name":"奶茶"}],"isOpened":true}
  const demoOrders = {"payment":"onclass","isPay":false,"order":[{"name":"日式豬排起司堡","code":"①","price":55},{"code":"A","price":20,"name":"紅茶"}]}
  const demoAnnoucements = {"2024-06-03":{"測試公告":"感謝您試用demo版"},"2024-06-02":{"測試公告2":"uwub"}}
  sessionStorage.setItem('currentUser', JSON.stringify(demoUser))
  sessionStorage.setItem('userdata', JSON.stringify(demoUserdata))
  sessionStorage.setItem('products', JSON.stringify(demoProducts))
  sessionStorage.setItem('orders', JSON.stringify(demoOrders))
  sessionStorage.setItem('annoucements', JSON.stringify(demoAnnoucements))
  router.push({ name: 'profile' })
}

// toast
const toastRef = ref(null)
function showToast(msg, type) {
  toastRef.value.showToast(msg, type)
}
</script>

<template>
  <toast ref="toastRef"/>
  <div class="flex flex-col justify-center gap-3">
    <button type="button" class="btn btn-primary mx-2" @click="signInPopup()" :disabled="loading">
      <googleicon />SignIn with Google
      <span class="loading loading-spinner loading-sm" v-if="loading"></span>
    </button>
    <button type="button"  class="btn btn-secondary mx-2" @click="demo" :disabled="loading">Try Demo</button>
  </div>
</template>