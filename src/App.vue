<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-06 16:48:03
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:21:14
 * @FilePath: /vue3_tailwindcss/src/App.vue
-->
<template>
  <div id="app">
    <ElConfigProvider :locale="locale">
      <router-view v-if="isLayout" />
      <Layout v-else> </Layout>
    </ElConfigProvider>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import Layout from './layout/index.vue'
import { useRoute } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import type { IRouteRecordRaw } from '@/types/modules/router'

import RoutsMap from '@/router/routes'

const isLayoutList = ref<string[]>(['Login'])

const useLayout = (): string[] => {
  const layoutList: string[] = []
  const getLayout = (routes: IRouteRecordRaw[]) => {
    routes.map((item: IRouteRecordRaw) => {
      if (item.children) {
        getLayout(item.children)
      } else if (item.meta.isLink) {
        layoutList.push(item.name)
      }
    })
  }
  getLayout(RoutsMap)
  return layoutList
}
isLayoutList.value = [...useLayout(), ...isLayoutList.value]
const locale = ref(zhCn)
const route = useRoute()
const pathName: Ref<any> = ref('Login')

const isLayout = computed(() => {
  return isLayoutList.value.includes(pathName.value)
})

watch(
  () => route.name,
  (val) => {
    pathName.value = val
  }
)
</script>
