/*
 * @Description: 路由
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-10 13:44:05
 * @LastEditors: tu
 * @LastEditTime: 2023-06-08 15:37:49
 * @FilePath: /vue3_tailwindcss/src/router/routes.ts
 */
// const Layout = () => import('@/layout/index.vue')
import type { IRouteRecordRaw } from '@/types/modules/router'
const RoutsMap: IRouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: '',
      invisible: false,
      permissions: ''
    },
    children: []
  },
  {
    path: '/Homes',
    name: 'Homes',
    component: () => import('@/views/map/index.vue'),
    meta: {
      title: '首页s',
      icon: '',
      invisible: false,
      permissions: ''
    }
  },

  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('@/views/echarts/index.vue'),
    meta: {
      title: 'Echarts',
      icon: '',
      invisible: false,
      permissions: '',
      keepAlive: true
    },
    children: []
  },
  {
    path: '/product-configuration',
    name: 'productConfiguration',
    // component: Layout,
    // component: { render: (e) => e('router-view') },
    meta: {
      title: '产品配置',
      icon: 'Management',
      permissions: ''
    },
    children: [
      {
        path: '/basic-configuration',
        name: 'mobileTerminal',
        component: () => import('../views/product-configuration/basic-configuration.vue'),

        meta: {
          title: '基础配置',
          icon: '',
          invisible: false,
          keepAlive: true,
          permissions: ''
        }
      },
      {
        path: '/seal-ip',
        name: 'sealIp',
        component: () => import('../views/product-configuration/seal-ip.vue'),
        meta: {
          title: '封IP/手机号',
          keepAlive: true,
          icon: '',
          permissions: '',
          isLink: true
        }
      }
    ]
  },
  {
    path: '/membership-management',
    name: 'membershipManagement',
    // component: Layout,
    // component: { render: (e) => e('router-view') },
    meta: {
      title: '会员管理',
      icon: 'Checked',
      permissions: ''
    },
    children: [
      {
        path: '/member-list',
        name: 'memberList',
        component: () => import('../views/membership-management/member-list.vue'),

        meta: {
          title: '会员列表',
          icon: '',
          invisible: false,
          keepAlive: true,
          permissions: ''
        }
      },
      {
        path: '/order-management',
        name: 'orderManagement',
        component: () => import('../views/membership-management/order-management.vue'),
        meta: {
          title: '订单管理',
          keepAlive: true,
          icon: '',
          permissions: ''
        }
      },
      {
        path: '/member-transaction-statistics',
        name: 'memberTransactionStatistics',
        component: () => import('../views/membership-management/member-transaction-statistics.vue'),
        meta: {
          title: '会员交易统计',
          keepAlive: true,
          icon: '',
          permissions: ''
        }
      }
    ]
  },
  {
    path: '/:404*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      icon: '',
      invisible: true,
      permissions: '',
      isLink: true
    }
  }
]
export default RoutsMap
