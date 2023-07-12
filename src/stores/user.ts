/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-10-15 16:22:20
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 16:42:35
 * @FilePath: /vue3_tailwindcss/src/stores/user.ts
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IRouteRecordRaw } from '@/types/modules/router'

import routerMap from '@/router/routes'
import { resetRouter } from '@/router'
import { getRoutes } from '@/utils/routes-utils'

interface Ienv {
  VITE_TOKEN_KEY: string
  VITE_APP_ENV: 'dev' | 'sit' | 'prod'
  VITE_VERSION: string
}

const { VITE_TOKEN_KEY, VITE_APP_ENV, VITE_VERSION }: Ienv = import.meta.env
//

const TOKEN_KEY = `${VITE_APP_ENV}_${VITE_VERSION}_${VITE_TOKEN_KEY}`

export const userStore = defineStore('user', () => {
  const token = ref(
    window.localStorage.getItem(TOKEN_KEY) ?? window.sessionStorage.getItem(TOKEN_KEY) ?? ''
  )
  const username = ref('')
  const routes = ref<IRouteRecordRaw[]>([])
  /**
   * @description:
   * @param {string} val token值
   * @param {Boolean | undefined} isLogin 是否永久保存
   * @return {*}
   */
  const setToken = (val: string, isLogin?: boolean) => {
    token.value = val
    window[isLogin ? 'localStorage' : 'sessionStorage'].setItem(TOKEN_KEY, val)
  }
  const setUserName = (val: string) => {
    username.value = val
  }
  const setRouter = (val: IRouteRecordRaw[]) => {
    routes.value = val
  }

  const removeToken = () => {
    token.value = ''
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(TOKEN_KEY)
  }
  const removeUserName = () => {
    username.value = ''
  }
  const removeRouterMap = () => {
    routes.value = []
  }
  // 假请求
  const getUserInfoApi = () => {
    return new Promise((resolve: (value: any) => void) => {
      setTimeout(() => {
        resolve({
          data: {
            username: 'tu'
          }
        })
      }, 100)
    })
  }
  const getUserInfo = async () => {
    // TODO: 这里需要改 请求用户信息
    const { data } = await getUserInfoApi()

    const route = getRoutes(routerMap, [])
    // setToken('123', true)
    setUserName(data.username)
    setRouter(route)
    return route as IRouteRecordRaw[]
  }
  const removeUserInfo = () => {
    resetRouter()
    removeToken()
    removeUserName()
    removeRouterMap()
  }
  // Forage;
  return {
    token,
    username,
    routes,
    getUserInfo,
    setToken,
    setUserName,
    setRouter,
    removeToken,
    removeUserName,
    removeRouterMap,
    removeUserInfo
  }
})
