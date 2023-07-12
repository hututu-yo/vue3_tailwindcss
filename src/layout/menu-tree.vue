<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-06-08 15:43:34
 * @FilePath: /vue3_tailwindcss/src/layout/menu-tree.vue
-->
<template>
  <template v-for="item in menu" :key="item.name">
    <el-menu-item
      :index="item.path"
      v-if="!item.children?.length"
      :key="item.path + '-menu-item'"
      @click="toPush(item)"
    >
      <el-icon v-if="item.icon" :class="item.icon" class="iconfont">
        <component :is="iconComponent(item.icon)" />
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
    <el-sub-menu
      v-if="item.children && item.children.length"
      :key="item.path + '-sub-menu'"
      :index="item.path"
    >
      <template #title>
        <el-icon v-if="item.icon" :class="item.icon" class="iconfont">
          <component :is="iconComponent(item.icon)" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group v-if="item.children?.length" :key="item.path + '-menu-item-group'">
        <MenuTree :menu="item.children"></MenuTree>
      </el-menu-item-group>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { ResultObj } from '@/types/modules/router'
import { useRouter } from 'vue-router'
const props = defineProps<{
  /**
   * 菜单列表 [ menu list ]
   */
  menu: ResultObj[]
}>()
const router = useRouter()
const { menu }: { menu: ResultObj[] } = props

const iconComponent = (icon: string): {} => {
  return icon as {}
}
const toPush = (e: ResultObj) => {
  if (e.children && e.children.length) {
    return
  }

  if (e.isLink) {
    window.open(e.path)
  } else {
    router.push({ name: e.name })
  }
}
</script>

<style lang="less" scoped>
// .MenuTree {
:deep(.el-menu-item-group__title) {
  display: none;
}

// }
</style>
