<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-06 17:16:17
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 11:52:46
 * @FilePath: /vue3_tailwindcss/src/views/login/index.vue
-->
<template>
  <div class="login">
    <el-button @click="login">5555</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { getFirstPage } from '@/utils/routes-utils'
// import loginApi from '@/api/modules/login'

const user = userStore()
const router = useRouter()

const loginApi = () => {
  return new Promise((resolve: (value: any) => void) => {
    setTimeout(() => {
      resolve({
        data: {
          token: new Date().getTime() + ''
        }
      })
    }, 100)
  })
}

const login = async () => {
  // const { data } = await loginApi.login({
  //   data: { WeChat_id: "PWD" }, failHook: (e: any) => {
  //     console.log('e: ', e);
  //   }
  // })
  const { data } = await loginApi()

  user.setToken('data.data', true)
  let routes = await user.getUserInfo()
  routes.map((item) => {
    router.addRoute(item as unknown as RouteRecordRaw)
  })
  const path = getFirstPage(routes)
  console.log('path: ', path);

  router.push(path) //会自动匹配到权限页面的第一个
}
// const login = async () => {
//   const { data } = await loginApi()
// }
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #198448;
}
</style>
