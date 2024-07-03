<template>
    <div class="card bg-base-200 shadow-md border-gray-400">
        <div class="card-body min-h-48 h-auto">
            <div class="flex flex-row gap-6 overflow-x-auto p-4">
                <div v-for="(friend, index) in friends" @click="showusermodal(index)" class="cursor-pointer transition transform ease-in-out duration-300 scale-100 hover:scale-110 active:scale-110">
                    <div class="flex flex-col items-center">
                        <div v-if="friend.avatar!==null" class="avatar">
                            <div class="w-24 rounded-full" :class="[isRing(friend.uuid)]">
                              <img :src="friend.avatarurl" />
                            </div>
                          </div>
                          <div v-else class="avatar placeholder">
                            <div class="bg-neutral text-neutral-content w-24 rounded-full" :class="[isRing(friend.uuid)]">
                              <span class="text-3xl">{{friend.name.slice(-1)}}</span>
                            </div>
                          </div>
                        <p class="mt-2 text-center whitespace-nowrap">{{friend.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <dialog v-if="friends.length>0" id="usermodal" class="modal">
        <div class="modal-box">
          <div class="flex item-center gap-2">
            <div class="mt-2">
              <div v-if="friends[friendindex].avatar!==null" class="avatar">
                <div class="w-20 rounded-full">
                  <img :src="friends[friendindex].avatarurl" />
                </div>
              </div>
              <div v-else class="avatar placeholder">
                <div class="bg-neutral text-neutral-content w-20 rounded-full">
                  <span class="text-xl font-bold">{{friends[friendindex].name.slice(-1)}}</span>
                </div>
              </div>
            </div>
            <h2 class="text-2xl self-center mx-2 font-bold">{{friends[friendindex].name}}</h2>
          </div>
          <div class="divider"></div>
          <div class="flex item-center gap-2 my-4">
            <h3 class="text-2xl font-bold">動態</h3>
            <span class="badge badge-info badge-lg self-center">{{getuserOrders(friends[friendindex].uuid).length}}</span>
          </div>
          <ul v-if="modalUserOrders.length>0" class="text-xl">
            <li v-for="order in modalUserOrders">
                {{ DateTime.fromISO(order.date).setLocale('zh-tw').toRelativeCalendar() }}
                <span class="text-gray-400" v-if="isPast(order.date)">吃了 </span>
                <span class="text-gray-400" v-else>要吃 </span>
                <span>{{ order.order.map(item => item.name).join(' & ')  }}</span>
            </li>
          </ul>
          <p v-else class="text-lg text-gray-400">這人不點餐，應該餓死了。</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import { DateTime } from 'luxon';
import { getFriend,getFriendOrders } from '@/utils/supabase';

const friends = ref([])
const friendOrders = ref([])
const friendindex = ref(0)
const modalUserOrders = ref([])
const now = DateTime.now().setZone('Asia/Taipei')

onMounted(()=>{
    fetchFriend()
    fetchFriendOrders()
})

const fetchFriend = async() => {
    friends.value = await getFriend()
    friends.value.sort((friend1, friend2) => {

        const ordersLength1 = getuserOrders(friend1.uuid).length;
        const ordersLength2 = getuserOrders(friend2.uuid).length;

        return ordersLength2 - ordersLength1;
    })
}

const fetchFriendOrders = async() => {
    friendOrders.value = await getFriendOrders()
    console.log(friendOrders.value)
}

const getuserOrders = (uuid) => {
    const result = friendOrders.value.filter(order=>order.uuid===uuid)
    return result
}

const isRing = (uuid) => {
    const anyOrder = getuserOrders(uuid).length > 0
    return {
        'ring-primary': anyOrder,
        'ring-offset-base-100': anyOrder,
        'ring': anyOrder,
        'ring-offset-2': anyOrder,
    }
}

const showusermodal = (index) => {
  friendindex.value = index
  const uuid = friends.value[index].uuid
  modalUserOrders.value = getuserOrders(uuid)
  document.getElementById('usermodal').showModal()
}

const isPast = (isostr) => {
    const orderDate = DateTime.fromISO(isostr);
    const now = DateTime.now();
    return orderDate <= now;
}
</script>