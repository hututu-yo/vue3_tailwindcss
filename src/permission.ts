/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-06-14 20:03:00
 * @LastEditors: tu
 * @LastEditTime: 2023-07-05 14:14:33
 * @FilePath: /vue3_tailwindcss/src/permission.ts
 */
import router from '@/router'
import { ElMessage } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'

import { userStore } from '@/stores/user'
// import NProgress from "nprogress";

// import { pageStore, type PageTabs } from '@/stores/page'
import { getFirstPage } from '@/utils/routes-utils'

// NProgress.configure({
//   easing: "ease", // 动画方式
//   speed: 500, // 递增进度条的速度
//   showSpinner: false, // 是否显示加载ico
//   trickleSpeed: 200, // 自动递增间隔
//   minimum: 0.3, // 初始化时的最小百分比
// });

// 全局前置路由守卫，进入路由前对登录态以及权限进行判断 todo
router.beforeEach(async (to, from, next) => {
  let user = userStore()
  // NProgress.start();
  // if (to.meta) {
  //   document.title = to.meta.title || "";
  // }

  // 判断是否登录
  if (user.token) {
    // 判断是否是获取token的路由及用户信息
    if (!user.username) {
      if (from.path === '/login') {
        // 判断是否是登录页进入
        next({ ...to, replace: true })
      } else {
        let routes = await user.getUserInfo()
        routes.map((item) => {
          router.addRoute(item as unknown as RouteRecordRaw)
        })
        const path = getFirstPage(user.routes)
        if (!to.name && to.path === '/') {
          // 不是登录页进入，直接访问根路由，跳转到第一个页面
          next({ path: path.path, replace: true })
        } else {
          // 不是登录页进入，刷新额面，跳转到当前路由
          // next({ ...to, replace: true })
          if (to.path === '/login') {
            next({ path: path.path, replace: true })
          } else {
            next({ ...to, replace: true })
          }
        }
      }
    } else {
      next()
    }
  } else {
    // 没有 token
    if (to.path == '/login') {
      next()
    } else {
      ElMessage.warning('登录失效')
      next({ path: '/login' }) //跳转页面到login页
    }
  }

  // if (to.name !== 'Login') {
  //   const pageInfo = pageStore()
  //   let pageTabs: PageTabs = {
  //     icon: to.meta.icon as string,
  //     path: to.path,
  //     title: to.meta.title as string,
  //     keepAlive: !!to.meta.keepAlive,
  //     name: to.name as string,
  //     invisible: !!to.meta.invisible,
  //     permissions: to.meta.permissions as string
  //   }
  //   pageInfo.setTabDefaultActive(to.name as string)
  //   pageInfo.addPageTabs(pageTabs)
  // }
})

router.afterEach(() => {
  // NProgress.done()
})
