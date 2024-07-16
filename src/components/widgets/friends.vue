<template>
  <div class="card bg-base-200 shadow-md border-gray-400">
    <figure class="w-full h-3 bg-primary"></figure>
      <div class="card-body">
         <div class="flex justify-between">
            <h2 class="card-title text-xl"><icon name="users" /> 好友</h2>
            <button @click="showaddfriendmodal" class="btn btn-sm btn-success">新增好友</button>
          </div>
          <div class="overflow-x-auto">
            <table v-if='friends.length > 0' class="table">
              <tbody>
                <tr v-for="(friend,index) in friends" class="h-24 text-lg">
                  <th class="w-24">
                    <div v-if="friend.avatar!==null" class="avatar">
                      <div class="w-20 rounded-full">
                        <img :src="friend.avatarurl" />
                      </div>
                    </div>
                    <div v-else class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content w-20 rounded-full">
                        <span class="text-xl">{{friend.name.slice(-1)}}</span>
                      </div>
                    </div>
                  </th>
                  <td class="text-xl font-bold whitespace-nowrap">{{friend.name}}</td>
                  <td class="text-end">
                    <button class="btn btn-circle btn-ghost" @click="showusermodal(index)">
                      <icon name="dot-vertical" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 v-else class='text-xl'>尚無好友</h2>
          </div>
      </div>
    </div>
    <dialog id="addfriendmodal" class="modal">
      <div class="modal-box">
        <div class="flex item-center">
          <icon name="user-add" />
          <h2 class="text-xl font-bold">新增好友</h2>
        </div>
        <div class="flex gap-2 mt-2">
          <input v-model="searchFrienduuid" type="text" placeholder="輸入用戶ID(UUID)" class="input input-bordered w-full" />
          <button @click="searchFriend" class="btn btn-secondary">查詢</button>
        </div>
        <div v-if="Object.keys(searchResult).length > 0" class="divider"></div>
        <div v-if="Object.keys(searchResult).length > 0" class="flex justify-between">
          <div class="flex item-center gap-2">
            <div class="mt-2">
              <div v-if="searchResult.avatar!==null" class="avatar">
                <div class="w-20 rounded-full">
                  <img :src="searchResult.avatarurl" />
                </div>
              </div>
              <div v-else class="avatar placeholder">
                <div class="bg-neutral text-neutral-content w-20 rounded-full">
                  <span class="text-xl">{{searchResult.name.slice(-1)}}</span>
                </div>
              </div>
            </div>
            <h2 class="text-2xl self-center mx-2">{{searchResult.name}}</h2>
          </div>
          <div class="modal-action">
            <form method="dialog" class="space-x-2">
              <button @click="addFriend" class="btn btn-success">加入</button>
            </form>
          </div>
        </div>
        <form method="dialog" class="space-x-2">
          <button @click="clearSearchResult" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </div>
    </dialog>
    <dialog v-if="friends.length>0" id="usermodal" class="modal">
      <div class="modal-box">
        <div v-if="friends[friendindex].avatar!==null" class="avatar">
          <div class="w-24 rounded-full">
            <img :src="friends[friendindex].avatarurl" />
          </div>
        </div>
        <div v-else class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-24 rounded-full">
            <span class="text-3xl">{{friends[friendindex].name.slice(-1)}}</span>
          </div>
        </div>
        <h2 class="text-xl font-bold">{{friends[friendindex].name}}</h2>
        <div class="badge badge-primary text-base">{{friends[friendindex].role}}</div>
        <p class="text-gray-400">uuid:{{friends[friendindex].uuid}}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button @click="delFriend(friends[friendindex].uuid)" class="btn btn-sm btn-error">刪除好友</button>
          </form>
        </div>
      </div>
    </dialog>
    <toast ref="toastRef" />
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {supabase} from '@/supabase'
import {getUserAvatar, getFriend} from '@/utils/supabase'
import icon from '@/components/widgets/icon.vue'
import toast from '@/components/widgets/toast.vue'


const toastRef = ref(null)
const searchFrienduuid = ref('')
const searchResult = ref({})
const userData = JSON.parse(sessionStorage.getItem('userData'))
const friends = ref([])
const friendindex = ref(0)

onMounted(()=>{
  fetchFriend()
})

const fetchFriend = async() => {
  friends.value = await getFriend()
  friendindex.value = 0 //重置modal避免刪除好友後錯誤
}

const delFriend = async() => {
  console.log()
  const {error} = await supabase.from('friendships').delete().eq('user_id',userData.auth.id).eq('frienduser_id',friends.value[friendindex.value].uuid)
  if (error){
    console.log(error)
    toastRef.value.showToast(`錯誤${error.code}`, 'alert-error')
  }
  toastRef.value.showToast('刪除好友成功', 'alert-success')
  fetchFriend()
}

const addFriend = async() => {
  const {error} = await supabase.from('friendships').insert({frienduser_id: searchResult.value.uuid})
  if (error){
    let toastmsg = ''
    if (error.code==='23505'){
      toastmsg = '好友紀錄已經存在(23505)'
    } else {
      toastmsg = `未知錯誤請回報開發者${error.code}`
    }
    toastRef.value.showToast(toastmsg, 'alert-error')
    return
  }
  toastRef.value.showToast('加入好友成功', 'alert-success')
  clearSearchResult()
  fetchFriend()
}

const searchFriend = async() => {
  const {data,error} = await supabase.from('users').select().eq('uuid',searchFrienduuid.value).single()
  if(error){
    console.log(error)
    let toastmsg = ''
    if (error.code==='22P02'){
      toastmsg = 'UUID格式錯誤(22P02)'
    }
    else if (error.code==='PGRST116'){
      toastmsg = '用戶不存在(PGRST116)'
    }
    else {
      toastmsg = `未知錯誤請回報開發者${error.code}`
    }

    toastRef.value.showToast(toastmsg, 'alert-error')
    clearSearchResult()
    return
  }
  searchResult.value = data
  if (data.avatar !== null){
    searchResult.value.avatarurl = await getUserAvatar(data.uuid)
  }
  console.log(data)
}

const clearSearchResult = () => {
  searchResult.value = {}
  searchFrienduuid.value = ''
}

const showaddfriendmodal = () => {
  document.getElementById('addfriendmodal').showModal()
}

const showusermodal = (index) => {
  friendindex.value = index
  document.getElementById('usermodal').showModal()
}
</script>