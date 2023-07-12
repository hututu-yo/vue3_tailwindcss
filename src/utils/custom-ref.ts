/*
 * @Description: 自定义ref [ custom ref ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-03 09:36:54
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 18:22:51
 * @FilePath: /vue3_tailwindcss/src/utils/custom-ref.ts
 */

import { customRef } from 'vue'

// 本地缓存ref
/**
 * @description:  本地缓存ref
 * @param {*} key  缓存key
 * @param {*} defaultValue  默认值
 */
export const useLocalCacheRef = <T>(key: string, defaultValue: T) => {
  return customRef<T>((track, trigger) => {
    return {
      get: () => {
        let sessionStorageValue: T = JSON.parse(sessionStorage.getItem(key) || '{}')[key]
        track()
        return sessionStorageValue ?? defaultValue
      },
      set: (value) => {
        let newValue = { [key]: value }
        sessionStorage.setItem(key, JSON.stringify(newValue))
        defaultValue = value
        trigger()
      }
    }
  })
}
