<!--
 * @Description:  侧边栏 [ aside ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-10-10 16:44:26
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 16:42:25
 * @FilePath: /vue3_tailwindcss/src/layout/aside.vue
-->
<template>
  <div class="aside">
    <el-menu
      :collapse="isCollapse"
      :default-active="defaultActive"
      background-color="#001529"
      text-color="#ffffff65"
      active-text-color="#ffffff"
      :collapse-transition="false"
    >
      <MenuTree :menu="menu"></MenuTree>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { IRouteRecordRaw, RouteMeta, ResultObj } from '@/types/modules/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// import routerMap from '@/router/routes'
import { userStore } from '@/stores/user'
import MenuTree from '@/layout/menu-tree.vue'

defineProps<{
  /**
   * 是否折叠 [ is collapse ]
   */
  isCollapse: boolean
}>()

const user = userStore()

const useMenu = (routerMap: IRouteRecordRaw[]): Ref<ResultObj[]> => {
  const menu: Ref<ResultObj[]> = ref([])
  const menuCreator = (list: IRouteRecordRaw[], rootKey = ''): ResultObj[] => {
    return list.map((item: IRouteRecordRaw) => {
      const { name, path, meta }: IRouteRecordRaw = item
      const { title, icon, invisible = false, keepAlive = false, isLink = false }: RouteMeta = meta
      const key = `${rootKey}/${name}`
      const newPath = path
      let children: ResultObj[] = []
      if (invisible) {
      }
      if (item.children && item.children.length > 0) {
        children = menuCreator(item.children, key)
      }
      const result: ResultObj = {
        key,
        invisible,
        icon: icon,
        title: title,
        name: name,
        path: newPath,
        keepAlive,
        isLink
      }
      if (children.length > 0) result.children = children
      return result
    })
  }
  // 循环过滤 invisible 为 true 的路由
  const filterInvisible = (list: ResultObj[]): ResultObj[] => {
    return list.filter((item: ResultObj) => {
      if (item.children && item.children.length > 0) {
        item.children = filterInvisible(item.children)
      }
      return !item.invisible
    })
  }
  menu.value = filterInvisible(menuCreator(routerMap))
  return menu
}

const routerMap = computed(() => user.routes)
const route = useRoute()
const defaultActive = computed(() => route.path)
// const menu = useMenu(routerMap)

const menu = ref<ResultObj[]>(useMenu(routerMap.value).value)

watch(
  () => routerMap,
  (nv) => {
    menu.value = useMenu(nv.value).value
  },
  { deep: true, immediate: true }
)
</script>

<style lang="less" scoped>
.aside {
  // width: 208px;
  height: calc(100% - 60px);
  max-height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  // 滚动条样式

  &::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: #001529;
  }
  // 滚动条底色

  // border-right: 1px solid #e8e8e8;
  ::v-deep(.el-menu) {
    height: 100%;
    border: 0;
    // 宽度变化时间 0.3
    transition: width 0.3s;

    .el-menu-item {
      transition: width 0.3s;
      width: 100%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
