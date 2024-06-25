<template>
    <div class="dropdown dropdown-top dropdown-end">
        <div tabindex="0" role="button" class="btn btn-primary w-full">選擇</div>
        <ul tabindex="0" class="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><input v-for="theme in themelist" @click="setTheme(theme)" type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme" :value="theme"/></li>
        </ul>
    </div>
</template>

<script setup>
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

const themelist = [
    'Husky',
    'Mocha',
    'Cappuccino',
    "winter",
    'Default',
    "valentine",
    'Discord',
    'Vercel',
    'Vercel-black',
]
</script>