/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-19 11:06:11
 * @LastEditors: tu
 * @LastEditTime: 2023-04-25 10:20:09
 * @FilePath: /vue3_tailwindcss/src/types/request.ts
 */
import type { AxiosRequestHeaders, AxiosResponse, ResponseType, AxiosRequestConfig } from 'axios'

export interface ApiOptions {
  name: string
  path: string
  method: string
  isDynamicUrl?: boolean
}
export interface IBaseInfo {
  /**
   * 接口名称 [ interface name ]
   */
  name: string
  /**
   * 请求方法 [ request method ]
   */
  method: string
  /**
   * 请求地址 [ request url ]
   */
  url: string
  /**
   * 是否动态URL [ is dynamic url ]
   */
  isDynamicUrl?: boolean
}
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  /**
   *  是否过滤空值 [ whether to filter empty values ]
   */
  emptyFilter?: boolean
  /**
   * 是否隐藏接口返回的错误提示 [ whether to hide the error prompt returned by the interface ]
   */
  // hideResToast?: boolean
  // /**
  //  * 请求参数 body [ request data body ]
  //  */
  // data?: object
  // /**
  //  * 请求参数 [ request params ]
  //  */
  // params?: object
  // /**
  //  * 请求头 [ request headers ]
  //  */
  // headers?: AxiosRequestHeaders
  /**
   * 请求失败的钩子 [ request fail hook ]
   */
  failHook?: Function
  /**
   *  响应类型 [ response type ]
   */
  responseType?: ResponseType
  /**
   *  动态拼接URL [ dynamic url ]
   */
  dynamicUrl?: string
}

export interface IAxiosResponse extends AxiosResponse {
  code: number
}
export type RequestCreator = (options: IAxiosRequestConfig) => Promise<IAxiosResponse>
export type ArrayElementType<T> = T extends ReadonlyArray<infer U> ? U : never
