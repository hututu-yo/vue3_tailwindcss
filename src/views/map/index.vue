<!--
 * @Description: 科室概览
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-09 15:26:13
 * @LastEditors: tu
 * @LastEditTime: 2023-05-10 15:11:08
 * @FilePath: /vue3_tailwindcss/src/views/map/index.vue
-->
<template>
  <div class="department-overview">
    <div class="search-box">
      <SearchCommon
        :config="searchConfig"
        v-model:query="query"
        :selectAttrs="selectAttrs"
        @onSearch="onSearch"
      >
      </SearchCommon>
      query: {{ query }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { searchConfig, selectAttrs } from './index'
const query = ref({})
const onSearch = (query: any) => {
  console.log('query', query)
}
</script>
<style lang="less" scoped>
.department-overview {
  height: 5000px;
  // width: 5000px;
  .search-box {
    :deep(.search-wrap) {
      .el-form-item {
        margin-bottom: 0;
      }
      .operation-button-box {
        // margin-left: auto;
      }
    }
  }
}
</style>
