/*
 * @Description: 页面信息 [ page information ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-10 18:30:48
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 14:36:50
 * @FilePath: /vue3_tailwindcss/src/stores/page.ts
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PageTabs {
  name: string
  path: string
  title: string
  icon?: string
  keepAlive?: boolean
  invisible?: boolean
  permissions?: string
}

export const pageStore = defineStore('page', () => {
  const pageTabsList = ref<PageTabs[]>([])
  const tabDefaultActive = ref<string>('')
  const addPageTabs = (pageTab: PageTabs) => {
    const index = pageTabsList.value.findIndex((item) => item.path === pageTab.path)
    if (index === -1) {
      pageTab.path && pageTabsList.value.push(JSON.parse(JSON.stringify(pageTab)))
    } else {
      pageTabsList.value.splice(index, 1, JSON.parse(JSON.stringify(pageTab)))
    }
  }
  const setTabDefaultActive = (path: string) => {
    tabDefaultActive.value = path
  }
  const removePageTabs = (path: string): number => {
    const index = pageTabsList.value.findIndex((item) => item.path === path)
    if (index !== -1) {
      pageTabsList.value.splice(index, 1) // 删除
    }
    return index
  }
  const removeArrPageTabs = () => {
    pageTabsList.value = []
  }

  return {
    pageTabsList,
    tabDefaultActive,
    addPageTabs,
    setTabDefaultActive,
    removePageTabs,
    removeArrPageTabs
  }
})
