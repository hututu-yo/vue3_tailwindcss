<!--
 * @Description: table表格列表
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-10-23 14:00:43
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 18:14:54
 * @FilePath: /vue3_tailwindcss/src/components/table-common.vue
-->

<template>
  <div class="tableWrap" v-adaptiveHeight="isSelfAdaption">
    <div class="tableTitleWrap">
      <div class="mainCol">
        <div class="tableTitle" v-if="title">{{ title }}</div>
        <div class="tableOperation" v-if="$slots['ds-operation']">
          <slot name="ds-operation"></slot>
        </div>
      </div>
      <slot name="ds-title-block"></slot>
    </div>
    <div class="tableBody">
      <el-table
        stripe
        v-loading="showLoading"
        fit
        style="width: 100%"
        v-bind="{ ...attrs, ...loadingConfig, ...$attrs }"
        ref="tableRef"
      >
        <template v-for="item in config" :key="item.prop">
          <slot class="slot" :name="item.prop" v-if="item.slot"></slot>
          <el-table-column
            show-overflow-tooltip
            align="center"
            headerAlign="center"
            v-bind="item"
            v-else
          />
        </template>
      </el-table>
    </div>

    <div class="paginationWrap" v-if="Object.keys(paginationConfig).length">
      <el-pagination
        layout="total, sizes, prev, pager, next"
        v-model:currentPage="paginationConfig.currentPage"
        v-model:page-size="paginationConfig.pageSize"
        :page-sizes="[10, 20, 50, 100, 200]"
        :total="paginationConfig.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-bind="paginationConfig.attrs"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import type { ObjectDirective } from 'vue'
import type {
  IPaginationConfig,
  IElTableInstance,
  IElTableColumnInstance
} from '@/types/modules/table-common'
import type { ElTableInstance, ElLoadingOptions } from '@/types/modules/element-plus'
const emit = defineEmits<{
  /**
   * 页码改变 [ page number change ]
   */
  (event: 'pageSizeChange', value: number): void
  /**
   * 每页条数改变 [ number of items per page change ]
   */
  (event: 'currentPageChange', value: number): void
}>()
const props = withDefaults(
  defineProps<{
    /**
     * 列表标题 [ list title ]
     */
    title?: string
    /**
     * 列表配置 对应el-table-column的参数 [ list config corresponding to el-table-column parameters ]
     */
    config: Array<IElTableColumnInstance>
    /**
     * 列表参数 对应el-table的参数 [ list parameters corresponding to el-table parameters ]
     */
    attrs: IElTableInstance
    /**
     * 对应el-pagination的参数 [ corresponding to el-pagination parameters ]
     */
    paginationConfig?: IPaginationConfig
    /**
     * 是否将table铺满屏幕剩余空间(overflow-y) [ Whether to spread the table to the remaining space of the screen (overflow-y) ]
     */
    isSelfAdaption?: boolean
    /**
     * 是否显示loading [ Whether to display loading ]
     */
    showLoading?: boolean
    /**
     *  对应el-loading的参数 [ corresponding to el-loading parameters ]
     */
    loadingConfig?: ElLoadingOptions
  }>(),
  {
    title: '',
    config: () => [],
    attrs: () => ({} as IElTableInstance),
    paginationConfig: () => ({} as IPaginationConfig),
    isSelfAdaption: false,
    showLoading: false,
    loadingConfig: () => ({} as ElLoadingOptions)
  }
)
const { attrs, showLoading, loadingConfig } = toRefs(props)
const handleSizeChange = (value: number) => {
  emit('currentPageChange', value)
}
const handleCurrentChange = (value: number) => {
  emit('pageSizeChange', value)
}
const tableRef = ref<ElTableInstance | null>(null)

defineExpose({
  tableRef
})

const vAdaptiveHeight: ObjectDirective = {
  mounted(el, binding) {
    if (!binding.value) return
    const tableBody = el.querySelector('.tableBody')
    const tableTitleWrapHeight =
      el?.querySelector('.tableTitleWrap')?.getBoundingClientRect().height || 0
    const paginationWrapHeight =
      el?.querySelector('.paginationWrap')?.getBoundingClientRect().height || 0
    const cardHeight =
      window.innerHeight - el.getBoundingClientRect().top - el.getBoundingClientRect().bottom

    const tableWrapPadding = 40
    const defaultGap = 30
    // el.style.height = `${cardHeight}px`;
    // tableBody.style.overflowY = "auto";

    // tableBody.style.height = `${cardHeight -
    //   tableTitleWrapHeight -
    //   paginationWrapHeight -
    //   tableWrapPadding -
    //   defaultGap
    //   }px`;
  }
}
</script>

<style lang="less" scoped>
.tableWrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .tableTitleWrap {
    .mainCol {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tableTitle {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .tableBody {
    flex: 1;

    // margin-top: 10px;
    :deep(.cell) {
      white-space: nowrap;
    }
  }

  .paginationWrap {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
}
</style>
