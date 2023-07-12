/*
 * @Description: element-plus组件类型定义 [ element-plus component type definition ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-12 11:06:05
 * @LastEditors: tu
 * @LastEditTime: 2023-05-09 17:28:26
 * @FilePath: /crisis_alarm_management_system/src/types/element-plus.ts
 */
// import { type PropType, ref } from 'vue'

import type {
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  LoadingOptions,
  ElSelect,
  ElOption,
  ElInput,
  ElDatePicker,
  ElCascader,
  ElPagination
} from 'element-plus'
// import type LoadingOptions from 'element-plus'

type PrefixedKeys<T extends object, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K]
}

/**
 * @description: 用于获取element-plus组件实例
 */
export type ElFormInstance = InstanceType<typeof ElForm>
export type ElFormItemInstance = InstanceType<typeof ElFormItem>
export type ElSelectInstance = InstanceType<typeof ElSelect>
export type ElOptionInstance = InstanceType<typeof ElOption>
export type ElInputInstance = InstanceType<typeof ElInput>
export type ElDatePickerInstance = InstanceType<typeof ElDatePicker>
export type ElCascaderInstance = InstanceType<typeof ElCascader>
export type ElPaginationInstance = InstanceType<typeof ElPagination>

export type ElTableInstance = InstanceType<typeof ElTable>

export type ElTableColumnInstance = InstanceType<typeof ElTableColumn>
// 将 LoadingOptions key加上前缀 element-loading-
export type ElLoadingOptions = PrefixedKeys<LoadingOptions['$props'], 'element-loading-'>

// export type ElLoadingOptions = <K extends keyof LoadingOptions>(
//   key: `element-loading-${K}`
// ) => LoadingOptions[K]
