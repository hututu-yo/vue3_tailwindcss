/*
 * @Description: 元素大小改变指令
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-30 13:22:25
 * @LastEditors: tu
 * @LastEditTime: 2023-05-03 13:43:20
 * @FilePath: /vue3_tailwindcss/src/directives/modules/resize.ts
 */

import type { ObjectDirective, DirectiveBinding } from 'vue'

const map = new WeakMap()
const ob = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const handler = map.get(entry.target)
    if (handler) {
      const { width, height } = entry.contentRect
      handler({ width, height })
    }
  })
})
const directives: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    ob.observe(el)
    map.set(el, binding.value)
    // binding.value({})
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
  }
}
export default directives
