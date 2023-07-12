import type { RouteRecordRaw } from 'vue-router'
export interface RouteMeta {
  /**
   *  路由标题 [ route title ]
   */
  title: string
  /**
   * 路由图标 [ route icon ]
   */
  icon?: string
  /**
   * 是否隐藏菜单 [ whether to hide the menu ]
   */
  invisible?: boolean
  /**
   * 是否缓存 [ whether to cache ]
   */
  keepAlive?: boolean
  /**
   * 是否是外链 [ whether it is an external link ]
   */
  isLink?: boolean
  /**
   * 权限编码 [ permission code ]
   */
  permissions?: string
}

//  修改RouteRecordRaw的children 为可选
export interface IRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  /**
   * 路由元信息 [ route meta information ]
   */
  meta: RouteMeta
  /**
   * 路由名称 [ route name ]
   */
  name: string
  /**
   * 子路由 [ sub route ]
   */
  children?: IRouteRecordRaw[]
}

export interface ResultObj {
  /**
   * 路由名称 [ name ]
   */
  name: string
  /**
   * 唯一标识 [ unique identifier ]
   */
  key: string
  /**
   * 是否隐藏菜单 [ whether to hide the menu ]
   */
  invisible: boolean
  /**
   * 菜单图标 [ menu icon ]
   */
  icon: string | undefined
  /**
   * 菜单标题 [ menu title ]
   */
  title: string | undefined
  /**
   * 路由地址和唯一标志 [ route address and unique identifier ]
   */
  path: string
  /**
   * 是否缓存页面 [ whether to cache the page ]
   */
  keepAlive: boolean
  /**
   * 是否是外链 [ whether it is an external link ]
   */
  isLink: boolean
  /**
   * 子菜单 [ sub menu ]
   */
  children?: ResultObj[]
}
