<!--
 * @Description:  头部 [ header ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-10 13:51:33
 * @LastEditors: tu
 * @LastEditTime: 2023-05-03 14:00:13
 * @FilePath: /vue3_tailwindcss/src/layout/header.vue
-->
<template>
  <div class="header">
    <div class="header-right">
      <div class="header-breadcrumb">
        <el-icon :size="21" color="#595959" @click="foldMenu">
          <Expand />
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight" style="padding-left: 20px">
          <el-breadcrumb-item v-for="item in matched" :key="item.name">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { userStore } from '@/stores/user'
import { pageStore } from '@/stores/page'

const route = useRoute()
const router = useRouter()
const user = userStore()
const page = pageStore()

const props = defineProps<{ isCollapse: boolean }>()
const emit = defineEmits<{
  (event: 'update:isCollapse', value: boolean): void
}>()

const isCollapse = toRef(props, 'isCollapse')
const matched: Ref<Array<any>> = ref([])
const foldMenu = () => {
  emit('update:isCollapse', !isCollapse.value)
}
const logOut = () => {
  user.removeUserInfo()
  page.removeArrPageTabs()
  router.push('/login')
}
watch(
  route,
  (newVal) => {
    matched.value = newVal.matched
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 12);

  .header-right {
    // width: 100%;
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-breadcrumb {
      display: flex;
      align-items: center;
    }
  }
}
</style>
