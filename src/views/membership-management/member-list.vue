<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2024-01-04 11:06:22
 * @FilePath: /vue3_tailwindcss/src/views/membership-management/member-list.vue
-->
<template>
  <div class="member-list">
    <SearchSelectCommon v-model="value" :dis="5"></SearchSelectCommon>
  </div>
</template>

<script lang="ts" setup>

import loginApi from '@/api/modules/login'

const value = ref('')
const login = async () => {
  const res = await loginApi.login({ data: { WeChat_id: "PWD" } })
}
</script>
<style lang="less" scoped>
.member-list {}
</style>
 