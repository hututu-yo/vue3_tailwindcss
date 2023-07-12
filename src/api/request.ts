/*
 * @Description: axios封装
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-07 14:32:08
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:21:57
 * @FilePath: /vue3_tailwindcss/src/api/request.ts
 */
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios'

import type {
  IBaseInfo,
  IAxiosRequestConfig,
  RequestCreator,
  IAxiosResponse
} from '@/types/modules/request'
import { ElMessage } from 'element-plus'
// import store from "@/stores/user";
import { userStore } from '@/stores/user.js'
let user = userStore()

import { randomString, objectEmptyFilter } from '../utils/index'

/**
 * 错误码对应的提示语
 */
const ERROR_MESSAE_MAP: { [key: number]: string } = {
  400: '请求错误',
  500: '服务器错误',
  404: '服务器繁忙'
}

/**
 * 错误提示Toast
 * @param {string} message 提示语
 */
const errorToast = (message: string) => {
  ElMessage({
    message,
    type: 'warning'
  })
}

/**
 * 请求默认参数抓取
 */
const deviceID = window.localStorage.getItem('__DS_DEVICE_ID__') || ''

/**
 * 请求实例构建
 */
const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000
})

/**
 * 设置通用请求头
 * X-TOKEN 用户登录态
 * X-PLATFORM 请求载体
 */
axiosInstance.defaults.headers.common['X-PLATFORM'] = 'ADMIN-FINANCE'

// 合并AxiosRequestConfig 类型中添加headers属性

/**
 * 请求预处理
 * 1. 设置请求trace-id，请求结果返回时也会带上同一个trace-id便于请求追踪
 * @TODO 添加请求发起的上报
 */
const beforeRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const newConfig: InternalAxiosRequestConfig = config
  if (user.token) {
    // token 信息
    newConfig.headers['Authorization'] = 'Bearer ' + user.token
  } else {
    // 未登录
    newConfig.headers['Authorization'] = ''
  }
  newConfig.headers['X-TRACE-ID'] = randomString(32, 'Aa#')
  newConfig.headers['DS-DEVICE-ID'] =
    deviceID || window.localStorage.getItem('__DS_DEVICE_ID__') || ''
  return newConfig
}

axiosInstance.interceptors.request.use(beforeRequest)

/**
 * 请求回包处理
 * @TODO 请求回包上报
 */
const afterResponse = (response: AxiosResponse): IAxiosResponse => {
  const { status, data } = response

  const code: string = String(status)
  if (code !== '200' && data.message) {
    ElMessage.error(`${data.message}`)
  }

  return { ...response, code: 200 }
}

/**
 * 请求错误处理
 * @property {function} error.response.config.failHook - 可选，如果定义failHook方法则不会走默认的错误处理
 * @TODO 请求异常上报
 */
const errorResponse = (error: AxiosError): Function | Promise<never> => {
  if (!error.response) {
    return Promise.reject(error)
  }

  const { data, status, config }: { data: any; status: number; config: any } = error.response

  if (config.failHook) {
    return config.failHook({ status, data })
  }

  if (ERROR_MESSAE_MAP[status]) {
    errorToast(ERROR_MESSAE_MAP[status] || data.message)
    // errorToast(data.message);
  }

  /**
   * 状态码为401时需要重新登录
   */
  if (status === 401) {
    return Promise.reject(new Error('请重新登录'))
  }

  return Promise.reject(error.response)
}

axiosInstance.interceptors.response.use(afterResponse, errorResponse)
/**
 * 通用请求生成器
 * @param {Object} baseInfo
 * @param {string} baseInfo.name
 * @param {string} baseInfo.method
 * @param {string} baseInfo.url
 * @returns {Function}
 */
const requestCreator = (baseInfo: IBaseInfo): RequestCreator => {
  // 返回类型是 函数函数返回 Promise<AxiosResponse<any, any>> 类型 怎么定义

  /**
   * @param {Object} options
   * @param {Boolean} options.emptyFilter
   * @param {Boolean} options.hideResToast
   * @param {Object} options.data
   * @param {Object} options.headers
   * @param {Function} options.failHook
   */
  return (options: IAxiosRequestConfig): Promise<IAxiosResponse> => {
    //  过滤空值
    if (typeof options.emptyFilter === 'undefined') {
      options.emptyFilter = true
    }

    // 动态URL
    let url = baseInfo.url
    if (options.dynamicUrl && baseInfo.isDynamicUrl) {
      url = `${baseInfo.url}/${options.dynamicUrl}`
    }

    // 参数过滤
    if (options.emptyFilter) {
      if (options.data) {
        options.data = objectEmptyFilter(options.data)
      }
      if (options.params) {
        options.params = objectEmptyFilter(options.params)
      }
    }

    return axiosInstance({ ...baseInfo, ...options, url })
  }
}

export { axiosInstance as Request, requestCreator }
