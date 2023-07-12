/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-09 17:25:17
 * @LastEditors: tu
 * @LastEditTime: 2023-06-20 16:08:43
 * @FilePath: /vue3_tailwindcss/src/types/modules/search-component.d.ts
 */
import type {
  ElFormInstance,
  ElFormItemInstance,
  ElSelectInstance,
  ElOptionInstance,
  ElInputInstance,
  ElDatePickerInstance,
  ElCascaderInstance
} from './element-plus'

export type SearchType = 'slot' | 'select' | 'input' | 'daterange' | 'cascader'
export type OptionAttrsType = { label: string | Function; value: string | Function; key: string }

// 类型中添加style属性且传入属性值改为可选 Partial
export type AddStyle<T> = Partial<T> & { style?: Partial<CSSStyleDeclaration> }

export type IElFormInstance = Partial<ElFormInstance>
export type IElFormItemInstance = Partial<ElFormItemInstance> //

export type IElSelectInstance = AddStyle<ElSelectInstance>
export type IElOptionInstance = AddStyle<ElOptionInstance>
export type IElInputInstance = AddStyle<ElInputInstance>
export type IElDatePickerInstance = AddStyle<ElDatePickerInstance>
export type IElCascaderInstance = AddStyle<ElCascaderInstance>

//  使得 SearchCommonConfig 中的属性变为可选
export interface SearchCommonConfig extends IElFormItemInstance {
  readonly key: string
  readonly type: SearchType
  attrs?: (Partial<ElSelectInstance['$props']> & { style?: Partial<CSSStyleDeclaration> }) &
    (Partial<ElOptionInstance['$props']> & { style?: Partial<CSSStyleDeclaration> }) &
    (Partial<ElInputInstance['$props']> & { style?: Partial<CSSStyleDeclaration> }) &
    (Partial<ElDatePickerInstance['$props']> & { style?: Partial<CSSStyleDeclaration> }) &
    (Partial<ElCascaderInstance['$props']> & { style?: Partial<CSSStyleDeclaration> })
  optionAttrs?: OptionAttrsType
}
