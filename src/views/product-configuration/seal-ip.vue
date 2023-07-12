<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-10 18:30:48
 * @LastEditors: tu
 * @LastEditTime: 2023-04-13 16:06:02
 * @FilePath: /vue3_tailwindcss/src/views/product-configuration/seal-ip.vue
-->
<template>
  <div class="seal-ip">
    <el-input v-model="value"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('123')
</script>
<style lang="less" scoped>
.seal-ip {}
</style>
