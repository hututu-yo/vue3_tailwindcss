<!--
 * @Description: 搜索区域
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-10-23 14:00:43
 * @LastEditors: tu
 * @LastEditTime: 2023-06-20 16:09:09
 * @FilePath: /vue3_tailwindcss/src/components/search-common.vue
-->
<template>
  <div class="search-wrap">
    <el-form inline :model="query" v-bind="{ ...formAttrs, ...$attrs }">
      <el-form-item
        :label="item.label"
        v-for="item in config"
        v-bind="item"
        :label-width="item.labelWidth ? item.labelWidth : undefined"
      >
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs?.style ? item.attrs?.style : { width: '220px' }"
        >
          <template v-if="item.optionAttrs">
            <el-option
              v-for="o in selectAttrs[item.key]"
              :key="item.optionAttrs && o[item.optionAttrs.key]"
              :label="
                typeof item.optionAttrs.label === 'function'
                  ? item.optionAttrs.label(o)
                  : o[item.optionAttrs.label]
              "
              :value="
                typeof item.optionAttrs.value === 'function'
                  ? item.optionAttrs.value(o)
                  : o[item.optionAttrs.value]
              "
            />
          </template>
        </el-select>
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs?.style ? item.attrs?.style : { width: '220px' }"
        />
        <!-- 时间范围选择 -->
        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs?.style ? item.attrs?.style : { width: '220px' }"
        />
        <!-- 多级联动 -->
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="query[item.key]"
          v-bind="item.attrs"
          :style="item.attrs?.style ? item.attrs?.style : { width: '220px' }"
        />
        <!-- 插槽 在现有查询组件不满足需求时使用 -->
        <slot :name="item.key" v-if="item.type === 'slot'" />
        <!-- todo 后续可以新增不同类型的组件 -->
      </el-form-item>
      <el-form-item class="operation-button-box">
        <slot name="operation">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="onCancel">清空</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
/**
 * config: [
 *      labelWidth: String， (非必填， 查询条件名称)
 *      key: String， (必填， 查询条件对应字段)
 *      type: String， (必填， 查询条件类型， type值为slot时候支持插槽)
 *      attrs: Object， (必填， element对应组件支持的参数，可以传入style，不传情况下默认宽度200px)
 *      optionAttrs: Array， (非必填， element对应组件有option的必填)
 * ]
 * selectAttrs: Object  (非必填  选择框对应下拉列表)
 * query: Object 存储查询条件值的对象
 * */
import { computed, toRefs } from 'vue'

import type { SearchCommonConfig, IElFormInstance } from '@/types/modules/search-component'

const props = withDefaults(
  defineProps<{
    /**
     *  表单配置 对应el-form的参数   [ form configuration corresponds to the parameters of el form ]
     */
    formAttrs?: IElFormInstance
    /**
     *  查询条件配置  [ query condition configuration ]
     *   type 对应搜索项el组件类型 [ type corresponds to the el component type of the search item ]
     *   attrs 对应搜索项el组件配置 [ attrs corresponds to the el component configuration of the search item ]
     *   key 对应搜索项的字段 [ key corresponds to the field of the search item ]
     *   label 对应搜索项的名称 [ label corresponds to the name of the search item ]
     *   optionAttrs 对应搜索项el组件option的配置 [ optionAttrs corresponds to the configuration of the option of the el component of the search item ]
     */
    config: SearchCommonConfig[]
    /**
     *  选择框对应下拉列表  [ select box corresponding drop-down list ]
     */
    selectAttrs?: { [key: string]: any[] }
    /**
     *  查询条件值  [ query condition value ]
     */
    query: { [key: string]: any }
  }>(),
  {
    formAttrs: () => ({} as IElFormInstance),
    config: () => [],
    selectAttrs: () => ({}),
    query: () => ({})
  }
)
const emit = defineEmits<{
  (event: 'update:query', value: { [key: string]: any }): void
  (event: 'onSearch', value: { [key: string]: any }): void
  (event: 'onCancel'): void
}>()
const { config, query } = toRefs(props)

const onSearch = () => {
  emit('onSearch', query.value)
}

const onCancel = () => {
  emit('update:query', {})
  console.log('query: ', query.value)
  emit('onCancel')
}
</script>

<style lang="less" scoped>
// .searchWrap {
:deep(.el-form-item) {
  margin-bottom: 15px;
}
// :deep(.el-card__body) {
//   padding: 20px 20px 8px 20px;
// }
// .operation-button-box {
// display: flex;
// justify-content: flex-end;
// margin-bottom: 15px;
// width: 100%;
// }
// }
</style>
