/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-10 10:14:45
 * @LastEditors: tu
 * @LastEditTime: 2023-05-10 11:58:56
 * @FilePath: /crisis_alarm_management_system/src/views/department-overview/index.ts
 */

import type { SearchCommonConfig } from '@/types/modules/search-component'
export const searchConfig: SearchCommonConfig[] = [
  {
    labelWidth: '80px',
    label: '机构名称',
    key: 'companyName',
    type: 'input',
    attrs: {
      placeholder: '请输入机构名称',
      clearable: true
    }
  },
  {
    labelWidth: '80px',
    label: '机构类型',
    key: 'companyType',
    type: 'select',
    attrs: {
      placeholder: '请选择机构类型',
      clearable: true,
      disabled: false
    },
    optionAttrs: {
      label: 'label',
      value: 'value',
      key: 'value'
    }
  }
]

export const selectAttrs = {
  companyType: [
    {
      label: '零售药店',
      value: '00'
    },
    {
      label: '财险公司',
      value: '01'
    },
    {
      label: '寿险公司',
      value: '02'
    },
    {
      label: '供应商',
      value: '03'
    },
    {
      label: '医药健康',
      value: '04'
    },
    {
      label: '信息科技',
      value: '05'
    }
  ]
}
