/*
 * @Description:  项目自定义指令 [ Project custom directives ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-30 13:22:09
 * @LastEditors: tu
 * @LastEditTime: 2023-06-12 11:57:57
 * @FilePath: /vue3_tailwindcss/src/directives/index.ts
 */
import type { ObjectDirective } from 'vue'

const directivesObj: { [key: string]: ObjectDirective } = import.meta.glob('./modules/**.ts', {
  eager: true,
  import: 'default'
})
// let directivesNameList = Object.keys(directivesObj)

// const directivesList = directivesNameList.map((item) =>
//   item.replace('./modules/', '').replace('.ts', '')
// )

// const directives: { [key: string]: ObjectDirective } = {}

// directivesList.forEach((item) => (directives[item] = directivesObj['./modules/' + item + '.ts']))

// const directivesPlugin: { [key: string]: Function } = {}

// for (const key in directives) {
//   directivesPlugin[key] = (Vue: any) => Vue.directive(key, directives[key])
// }

const directivesPlugin: { [key: string]: Function } = {}

Object.entries(directivesObj).forEach(([key, value]) => {
  const directiveName = key.replace('./modules/', '').replace('.ts', '')
  directivesPlugin[directiveName] = (Vue: any) => Vue.directive(directiveName, value)
})

export default directivesPlugin
