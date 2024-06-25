<template>
    <div class="transition transform ease-in-out scale-100 active:scale-95">
      <div class="card bg-base-200 shadow-md border-gray-400">
        <router-link :to="props.to">
        <div class="card-body">
            <div class="flex justify-between items-center">
                <h2 class="card-title text-2xl">{{props.text}}</h2>
                <anglerighticon />
            </div>
        </div>
        </router-link>
      </div>
    </div>
</template>

<script setup>
import anglerighticon from '@/assets/icons/angle-right.svg'

const props = defineProps(['text', 'to'])
</script>