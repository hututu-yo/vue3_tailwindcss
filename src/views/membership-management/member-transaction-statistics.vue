<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-05-04 09:45:38
 * @FilePath: /vue3_tailwindcss/src/views/membership-management/member-transaction-statistics.vue
-->
<template>
  <div class='ad'>
    <el-button @click="aa = !aa">{{ aa }}</el-button>
  </div>
</template>

<script lang='ts' setup>
import { useLocalCacheRef } from '@/utils/custom-ref'
const aa = useLocalCacheRef<boolean>('aasssdd', false)
console.log('aa: ', aa);

</script>
<style lang='less' scoped>
.ad {}
</style>