<!--
 * @Description: 选择select组件 [ select component ] 
 * @Version: 1.0
 * @Author: tu
 * @Date: 2024-01-04 10:52:26
 * @LastEditors: tu
 * @LastEditTime: 2024-01-04 14:46:19
 * @FilePath: /vue3_tailwindcss/src/components/search-select-common.vue
-->
<template>
  <div class='search-select-common'>
    <el-popover placement="bottom" trigger="click" width="auto" popper-class="search-select-common-popover">
      <template #reference>
        <slot name="reference">
          <el-input v-model="modelValue" placeholder="Please input" />
        </slot>
      </template>
      <template #default>
        <main class="main">
          <header class="header">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
              <el-tab-pane label="User" name="first"></el-tab-pane>
              <el-tab-pane label="Config" name="second"></el-tab-pane>
              <el-tab-pane label="Role" name="third"></el-tab-pane>
              <el-tab-pane label="Task" name="fourth"></el-tab-pane>
            </el-tabs>
          </header>
          <section class="section">
            <div style="height: 500px;"></div>
          </section>
          <footer class="footer">
            <el-input></el-input>
            <el-button class="add-custom-btn">添加</el-button>
          </footer>
        </main>
      </template>
    </el-popover>
  </div>
</template>

<script lang='ts' setup>
const props = withDefaults(defineProps<{
  // 多种类型的值
  modelValue: string | number | null | undefined
}>(), {
  modelValue: ''
})
const emit = defineEmits<{
  (event: 'handleTabClick', tab: any): void
}>()
const slots = useSlots()
const attrs = useAttrs()
const modelValue = toRef(props, 'modelValue')

const activeName = ref('first')
const handleTabClick = (tab: any) => {
  emit('handleTabClick', tab)
}



</script>
<style lang='less' scoped>
.search-select-common {
  width: 100%;
}

// :deep(.search-select-common-popover) {
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  min-width: 600px;


  .header {
    :deep(.el-tabs) {
      .el-tabs__header {
        margin-bottom: 0;
      }
    }

    // height: 50px;
    // background-color: #f0f0f0;
  }

  .section {
    flex: 1;
    margin: 10px 0;
    overflow: auto;

    // 滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.1);
    }

  }

  .footer {
    display: flex;
    justify-content: space-between;

    .add-custom-btn {
      margin-left: 10px;
    }
  }
}

// }
</style>