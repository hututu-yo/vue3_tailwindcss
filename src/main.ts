/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-06 16:48:03
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:13:41
 * @FilePath: /vue3_tailwindcss/src/main.ts
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// console.log('ElementPlusIconsVue: ', ElementPlusIconsVue)
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'

import router from '@/router'
import '@/permission'
import directives from '@/directives/index'
import '@/style/index.less'

function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将该插件交给 Pinia
pinia.use(SecretPiniaPlugin)

const app = createApp(App)

// 全局挂载指令
for (const key in directives) {
  directives[key](app)
}

app.use(router)
app.use(pinia)
// app.use(ElementPlus, {
//   locale: zhCn
// })
// Object.keys(ElementPlusIconsVue).forEach((key) => {
//   app.component(key, ElementPlusIconsVue[key as keyof typeof Icons])
// })
import * as Icons from '@element-plus/icons-vue'

// 全局注册图标 牺牲一点性能
for (let i in Icons) {
  app.component(i, (Icons as any)[i])
}

app.mount('#app')
