<!--
 * @Description:  页面 [ page ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-10-22 12:30:19
 * @LastEditors: tu
 * @LastEditTime: 2023-06-06 18:28:46
 * @FilePath: /vue3_tailwindcss/src/layout/page.vue
-->
<template>
  <TagsNav @tab-remove="remove"></TagsNav>

  <div class="page">
    <router-view v-slot="{ Component }">
      <!-- <Transition name="animation" mode="default"> -->
      <keep-alive ref="keepAliveRef">
        <component :is="Component" v-if="keepAlive" :key="id" :name="id" />
      </keep-alive>
      <component :is="Component" v-if="!keepAlive" :key="id" />
      <!-- </Transition> -->
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, type KeepAlive, type ComponentOptions } from 'vue'
import { useRoute } from 'vue-router'

import TagsNav from '@/layout/tags-nav.vue'

import { KeepAliveHandler } from '@/utils/handler'

const route = useRoute()

const keepAliveRef = ref<ComponentOptions>()
const handler = new KeepAliveHandler()

const keepAlive = computed(() => route.meta.keepAlive)

const id = computed(() => route.name)
const remove = (key: string) => {
  handler.remove(key)
}
onMounted(() => {
  keepAliveRef.value && handler.bind(keepAliveRef.value)
})
watch(id, () => {
  keepAliveRef.value && handler.bind(keepAliveRef.value)
})
</script>

<style lang="less" scoped>
.page {
  height: calc(100% - 42px);
  flex: 1;
  max-height: calc(100% - 42px);
  overflow: auto;
  background-color: #f5f7f9;
  // background-color: var(--page-bg-color);
  padding: 15px;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #ccc;
  }
}

.demo-tabs {
  // border-bottom: none;
  // padding-bottom: 6px;
  :deep(.el-tabs__header) {
    border-bottom: none;

    .el-tabs__nav-wrap {
      margin-bottom: 0;
    }

    .el-tabs__item {
      border-bottom: none;
      padding-left: 20px !important;
    }
  }

  :deep(.el-tabs__content) {
    display: none;
  }
}
</style>
