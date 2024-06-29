<template>
    <div class="card bg-base-300 shadow-md">
    <figure class="max-h-32">
        <img :src="props.image" />
    </figure>
    <div class="card-body">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <icon name="heart" />
                <h2 class="card-title">{{ props.title }}</h2>
            </div>
            <span class="badge badge-secondary">AD</span>
        </div>
        <p>{{ props.content }}</p>
        <div class="card-action">
            <a :href="props.link" class="btn btn-sm btn-primary w-full">GO</a>
        </div>
    </div>
    </div>
</template>

<script setup>
import {ref, defineProps} from 'vue'
import icon from '@/components/widgets/icon.vue'

const props = defineProps({
    image: String,
    title: String,
    content: String,
    link: String
})
</script>