<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-06-16 18:18:22
 * @FilePath: /vue3_tailwindcss/src/views/product-configuration/basic-configuration.vue
-->
<template>
  <div class="basic">
    {{ isDark }}
    <el-button @click="toggleDark">555</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
const isDark = useDark({
  // selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

// const toggleDark = useToggle(!isDark.value) // 切换
const toggleDark = () => {
  isDark.value = !isDark.value
}
</script>
<style lang="less" scoped>
.basic {
}
</style>
