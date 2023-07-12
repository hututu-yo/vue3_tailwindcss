<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-04-25 13:52:47
 * @FilePath: /vue3_tailwindcss/src/views/membership-management/member-list.vue
-->
<template>
  <div class="aa">
    <el-button @click="login">
      5555
    </el-button>
  </div>
</template>

<script lang="ts" setup>

import loginApi from '@/api/modules/login'
const login = async () => {
  const res = await loginApi.login({ data: { WeChat_id: "PWD" } })
}
</script>
<style lang="less" scoped>
.aa {}
</style>
 