<template>
      <div class="card bg-base-200 shadow-md border-gray-400 cursor-point transition duration-300 ease-in-out hover:bg-base-300">
        <router-link :to="props.to">
        <div class="card-body">
            <div class="flex justify-between items-center">
                <h2 class="card-title text-2xl">{{props.text}}</h2>
                <anglerighticon />
            </div>
        </div>
        </router-link>
      </div>
</template>

<script setup>
import anglerighticon from '@/assets/icons/angle-right.svg'

const props = defineProps(['text', 'to'])
</script>