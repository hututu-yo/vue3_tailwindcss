<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-07 14:32:08
 * @LastEditors: tu
 * @LastEditTime: 2023-06-24 17:15:01
 * @FilePath: /vue3_tailwindcss/src/views/home/index.vue
-->
<template>
  <div class="home">
    <TableCommon ref="tableCommonRef" :title="title" :config="tableConfig" :attrs="tableAttrs"
      :paginationConfig="paginationConfig" :isSelfAdaption="isSelfAdaption" :showLoading="showLoading"
      :loadingConfig="loadingConfig" class="table-common">
      <template v-slot:address>
        <el-table-column label="Thumbnail" width="180">
          <template #default="scope: any">
            {{ scope.row.name }}
          </template>
        </el-table-column>
      </template>
    </TableCommon>
    <el-button @click=" addData "> 重置 </el-button>
    <br />

    <el-button @click=" reset "> 重置 </el-button>
    <el-button @click=" toPath "> 跳转 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import TableCommon from '@/components/table-common.vue'
import type { ElTableColumnInstance, ElLoadingOptions } from '@/types/modules/element-plus'
import type { IElTableInstance } from '@/types/modules/table-common'
type tableCommon = InstanceType<typeof TableCommon>

const router = useRouter()

const tableCommonRef = ref<tableCommon | null>(null)

const title = ref('首页')
const tableConfig = ref([
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address', type: 'slot' }
] as ElTableColumnInstance[])
const tableAttrs = ref<IElTableInstance>({
  data: [{ date: '2021-01-01' }],
  height: 200,
  stripe: false
} as IElTableInstance)

const showLoading = ref(false)
const loadingConfig = ref<ElLoadingOptions>({
  'element-loading-text': '5555',
  'element-loading-background': 'rgba(0, 0, 0, 0.8)'
})
const paginationConfig = reactive({})
const isSelfAdaption = ref(true)
const addData = () => {
  showLoading.value = true
  setTimeout(() => {
    tableAttrs.value.data.push({ date: '2021-01-02' })
    showLoading.value = false
  }, 1000)
}
const reset = () => {
  showLoading.value = true
  setTimeout(() => {
    tableAttrs.value.data = [{ date: '2021-01-01' }]
    showLoading.value = false
  }, 1000)
}
const toPath = () => {
  router.push({ name: 'Homes' })
}
onMounted(() => {
  // console.log(tableCommonRef.value?.tableRef?.clearSelection)
})
</script>
<style lang="less" scoped>
.home {
  .table-common {
    height: 300px;
  }
}
</style>
