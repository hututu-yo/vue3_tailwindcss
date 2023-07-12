<!--
 * @Description:  标签导航 [ tags-nav ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-12 15:36:28
 * @LastEditors: tu
 * @LastEditTime: 2023-06-08 15:29:13
 * @FilePath: /vue3_tailwindcss/src/layout/tags-nav.vue
-->
<template>
  <div class="tags-nav">
    <div class="left">
      <el-button icon="ArrowLeft" color="#fffc" @click="leftSliding"></el-button>
    </div>
    <div class="content" ref="tagContentRef">
      <el-check-tag
        :checked="item.path == tabDefaultActive"
        closable
        v-for="item in pageTabsList"
        :key="item.path"
        :id="replaceStr(item.path)"
        @click="toPage(item)"
      >
        {{ item.title }}
        <el-button icon="Close" text @click.stop="removeTab(item)"> </el-button>
      </el-check-tag>
    </div>

    <div class="right">
      <el-button icon="ArrowRight" color="#fffc" @click="rightSliding"> </el-button>
      <el-dropdown>
        <el-button icon="CircleClose" color="#fffc"> </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="current" @click="closeCurrent"> 关闭当前 </el-dropdown-item>
            <el-dropdown-item command="other" @click="closeOther"> 关闭其他 </el-dropdown-item>
            <el-dropdown-item command="arr" @click="closeArr"> 关闭所有 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageTabs } from '@/stores/page'
const emits = defineEmits<{
  (event: 'tabChange', tab: string): void
  (event: 'tab-remove', tab: string): void
}>()
const router = useRouter()
const route = useRoute()
const user = userStore()
const pageInfo = pageStore()

const tagContentRef = ref<HTMLElement>()

const tabDefaultActive = computed({
  get: () => pageInfo.tabDefaultActive,
  set: (val) => {
    pageInfo.setTabDefaultActive(val)
  }
})
const pageTabsList = computed(() => pageInfo.pageTabsList)

const toPage = (to: PageTabs) => {
  let name = to.name
  // 添加 keepAlive 缓存
  emits('tabChange', name)
  tabDefaultActive.value = to.path
  router.push({ path: to.path })
}

const removeTab = (to: PageTabs) => {
  let path = to.path
  // 清除 keepAlive 缓存
  // remove(name)
  emits('tab-remove', to.name)

  if (pageTabsList.value.length === 1) {
    if (path !== getFirstPage(user.routes).path) pageInfo.removePageTabs(path)
    tabDefaultActive.value = getFirstPage(user.routes).path
  } else {
    const index = pageInfo.removePageTabs(path)
    if (path === tabDefaultActive.value) {
      if (index === 0) {
        tabDefaultActive.value = pageTabsList.value[0]?.path || getFirstPage(user.routes).path
      } else {
        tabDefaultActive.value = pageTabsList.value[index - 1]?.path
      }
    }
  }
  router.push({ path: tabDefaultActive.value })
}

// 将 字符串 中 / 替换成 -
const replaceStr = (str: string) => {
  return str.replace(/\//g, '-')
}

const leftSliding = () => {
  if (!tagContentRef.value) return
  let width = tagContentRef.value.offsetWidth / 2
  tagContentRef.value.scrollLeft -= width
}
const rightSliding = () => {
  // tagContentRef 右滑动一半宽度
  if (!tagContentRef.value) return
  let width = tagContentRef.value.offsetWidth / 2
  tagContentRef.value.scrollLeft += width
}
const closeCurrent = () => {
  let path = route.path
  if (pageTabsList.value.length === 1) {
    if (path !== getFirstPage(user.routes).path) pageInfo.removePageTabs(path)
    tabDefaultActive.value = getFirstPage(user.routes).path
    router.push({ path: tabDefaultActive.value })
  } else {
    const index = pageInfo.removePageTabs(path)
    if (path === tabDefaultActive.value) {
      if (index === 0) {
        tabDefaultActive.value = pageTabsList.value[0]?.path || getFirstPage(user.routes).path
      } else {
        tabDefaultActive.value = pageTabsList.value[index - 1]?.path
      }
    }
    router.push({ path: tabDefaultActive.value })
  }
}
const closeOther = () => {
  pageInfo.removeArrPageTabs()
  let path = route.path
  let pageTabs: PageTabs = {
    icon: route.meta.icon as string,
    path: route.path,
    title: route.meta.title as string,
    keepAlive: !!route.meta.keepAlive,
    name: route.name as string,
    invisible: !!route.meta.invisible,
    permissions: route.meta.permissions as string
  }
  pageInfo.addPageTabs(pageTabs)
  tabDefaultActive.value = path
  router.push({ path: tabDefaultActive.value })
}
const closeArr = () => {
  pageInfo.removeArrPageTabs()
  let route = getFirstPage(user.routes)
  let pageTabs: PageTabs = {
    icon: route.meta.icon as string,
    path: route.path,
    title: route.meta.title as string,
    keepAlive: !!route.meta.keepAlive,
    name: route.name as string,
    invisible: !!route.meta.invisible,
    permissions: route.meta.permissions as string
  }
  pageInfo.addPageTabs(pageTabs)
  tabDefaultActive.value = route.path
  router.push({ path: tabDefaultActive.value })
}
watch(
  () => route,
  (to) => {
    if (to.name !== 'Login') {
      let pageTabs: PageTabs = {
        icon: to.meta.icon as string,
        path: to.path,
        title: to.meta.title as string,
        keepAlive: !!to.meta.keepAlive,
        name: to.name as string,
        invisible: !!to.meta.invisible,
        permissions: to.meta.permissions as string
      }
      tabDefaultActive.value = to.path
      // pageInfo.setTabDefaultActive(to.path as string)
      pageInfo.addPageTabs(pageTabs)
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => tabDefaultActive.value,
  async () => {
    await nextTick()
    if (route.path) {
      let id = replaceStr(route.path)
      let dom = document.querySelector('#' + id)

      if (dom) {
        dom.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style lang="less" scoped>
.tags-nav {
  display: flex;
  height: 42px;
  width: 100%;
  padding: 5px 15px;
  // background: var(--page-bg-color);
  background: #f5f7f9;
  .left {
    padding-right: 5px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      height: 28px;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    max-width: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    // 滚动动画
    transition: all 0.3s;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-check-tag {
      flex-shrink: 0;
      display: flex;
      margin: 0 5px;
      background-color: #fff;
      &.is-checked {
        background-color: #d9ecff;
        .el-button {
          color: #409eff;
        }
      }
      &:hover {
        background-color: #e4e4e4;
        color: #82bdf8;
        .el-button {
          color: #82bdf8;
        }
      }
      .el-button {
        margin-left: 5px;
        padding: 0;
        line-height: 1;
        height: 100%;
        background-color: transparent;
        &:hover {
          color: #5fabf8;
        }
      }
    }
  }
  .right {
    padding-left: 5px;

    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      height: 28px;
      padding-left: 5px;
      padding-right: 5px;
    }
    .el-dropdown {
      margin-left: 5px;
    }
  }
}
</style>
