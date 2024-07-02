<template>
    <details class="dropdown dropdown-bottom">
        <summary class="transition transform ease-in-out duration-300 scale-100 hover:scale-105 active:scale-100">選擇主題</summary>
        <ul class="menu dropdown-content rounded-box z-50 w-full h-24 lg:h-32 overflow-y-auto">
          <li><input v-for="theme in themelist" @click="setTheme(theme)" type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" :aria-label="theme" :value="theme"/></li>
        </ul>
      </details>
</template>

<script setup>
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

const themelist = [
    '壢中藍',
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