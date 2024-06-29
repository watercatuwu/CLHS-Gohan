<template>
    <span v-if="currentComponent === null"></span>
    <component v-else :is="currentComponent"></component>
  </template>

<script setup>
  import { ref, onMounted, defineAsyncComponent, defineProps, markRaw } from 'vue'

  const props = defineProps({
    name: String
  })

  // 使用 ref 定義當前要渲染的組件
  const name = props.name
  const currentComponent = ref(null)

  onMounted(async () => {
    // 使用 import() 函數動態引入組件
    const component = defineAsyncComponent(() => import(`@/assets/icons/${name}.svg`))
    currentComponent.value = markRaw(component)
  })
</script>