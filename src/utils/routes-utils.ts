/*
 * @Description: 路由工具类
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-06-15 15:31:19
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 09:45:41
 * @FilePath: /vue3_tailwindcss/src/utils/routes-utils.ts
 */
/**
 * @description:  路由工具类
 * @param {*} RoutsMap  路由配置
 * @param {*} authPermissionMenuCodeVm  权限菜单编码
 * @return {*}  路由配置
 */
import type { IRouteRecordRaw } from '@/types/modules/router'

export const getRoutes = (
  RoutsMap: IRouteRecordRaw[],
  authPermissionMenuCodeVm: Array<string> = []
): IRouteRecordRaw[] => {
  let routes: IRouteRecordRaw[] = []
  RoutsMap.forEach((item) => {
    if (
      (item.meta.permissions && authPermissionMenuCodeVm.includes(item.meta.permissions)) ||
      !item.meta.permissions
    ) {
      if (item.children && item.children.length > 0) {
        item.children = getRoutes(item.children, authPermissionMenuCodeVm)
      }
      routes.push(item)
    }
  })

  return routes
}
/**
 * @description:  获取路由第一个页面
 * @param {IRouteRecordRaw} routes 路由配置
 * @return {*} 路由第一个页面
 */
export const getFirstPage = (routes: IRouteRecordRaw[]): IRouteRecordRaw => {
  let path = {} as IRouteRecordRaw
  routes.find((item, index) => {
    if (item.redirect || item.meta.invisible) {
      return false
    }
    if (item.component) {
      path = item
      return true
    }
    if (item.children && item.children.length > 0) {
      path = getFirstPage(item.children)
      return true
    } else {
      path = item
      return true
    }
  })
  return path
}

/**
 * @description:  获取缓存路由
 * @param {IRouteRecordRaw} routes 路由配置
 * @return {*} 缓存路由
 */
export const getKeepAliveRoutes = (routes: IRouteRecordRaw[]): string[] => {
  let keepAliveRoutes: string[] = []
  routes.forEach((item) => {
    if (item.meta.keepAlive) {
      keepAliveRoutes.push(item.name)
    }
    if (item.children && item.children.length > 0) {
      keepAliveRoutes = keepAliveRoutes.concat(getKeepAliveRoutes(item.children))
    }
  })
  return keepAliveRoutes
}
