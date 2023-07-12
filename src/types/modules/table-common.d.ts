/*
 * @Description: table-common组件类型定义 [ table-common component type definition ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-07-11 18:05:15
 * @FilePath: /vue3_tailwindcss/src/types/modules/table-common.d.ts
 */
import type { ElTableInstance, ElTableColumnInstance, ElPaginationInstance } from './element-plus'

interface IElTableInstance extends Omit<Partial<ElTableInstance['$props']>, 'data'> {
  // 将ElTableInstance data 属性 取消 readonly
  data: any[]
}

interface IElTableColumnInstance extends Omit<Partial<ElTableColumnInstance>, 'slot'> {
  slot?: Boolean
}
type IElPaginationInstance = Partial<ElPaginationInstance>

interface Props {
  title: string
  config: Array<any>
  attrs: object
  paginationConfig: IPaginationConfig
  isSelfAdaption: boolean
}
interface IPaginationConfig {
  total?: number
  pageSize?: number
  currentPage?: number
  attrs?: Partial<ElPaginationInstance>
}

export { IElTableInstance, IElTableColumnInstance, Props, IPaginationConfig }
