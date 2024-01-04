/*
 * @Description:  登录模块api
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-08 10:08:05
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:12:44
 * @FilePath: /vue3_tailwindcss/src/api/modules/login.ts
 */
import { requestCreator } from '../request'
// import type { ApiOptions, RequestCreator, ArrayElementType } from '@/types/modules/request'

import config from '../../libs/config'

const API_LIST = [
  {
    name: 'reguser',
    path: 'user/reguser',
    method: 'post',
    isDynamicUrl: true
  },
  {
    name: 'login',
    path: 'user/login',
    method: 'post',
    isDynamicUrl: true
  }
] as const

type ApiListName = ArrayElementType<typeof API_LIST>['name']
type ServiceType = {
  [key in ApiListName]: RequestCreator
}
let service: ServiceType = {} as ServiceType
API_LIST.map((u) => {
  service[u.name] = requestCreator({
    ...u,
    url: `${config.domainServiceURL}/${u.path}`
  })
})

export default service
