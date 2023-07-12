/*
 * @Description: 静态路由
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-02 16:09:27
 * @LastEditors: tu
 * @LastEditTime: 2023-04-12 18:27:49
 * @FilePath: /vue3_tailwindcss/src/router/index.ts
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RoutsMap from './routes'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/views/home/index.vue'),
  //   meta: {
  //     title: '首页',
  //     icon: '',
  //     invisible: false,
  //     permissions: ''
  //   }
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '注册',
      icon: '',
      invisible: false,
      permissions: ''
    }
  }
  // ...RoutsMap
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes] // as unknown as RouteRecordRaw[]
})

export function resetRouter() {
  RoutsMap.map((item) => {
    router.removeRoute(item.name)
  })
}

// export { routes }
export default router
