<!--
 * @Description:  数字滚动
 * @Version: 1.0
 * @Author: tu
 * @Date: 2023-07-11 17:50:10
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:22:45
 * @FilePath: /vue3_tailwindcss/src/components/count-to-common.vue
-->
<template>
  <div class="count-to-common">{{ number }}</div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     *  持续时间 ms [ duration ms ]
     */
    duration?: number
    /**
     *  目标值 [ target value ]
     */
    to?: number
    /**
     *  开始值 [ start value ]
     */
    from?: number
    /**
     *  数字格式化 [ number format ]
     */
    format?: (value: number) => number
    /**
     *  数字变化完成回调 [ number change complete callback ]
     */
    complete?: () => void
  }>(),
  {
    duration: 1000,
    to: 0,
    from: 0,
    format: (value: number) => value,
    complete: () => { }
  }
)
const { duration, to, from, format, complete } = toRefs(props)
const number = ref(from.value)

rollingDigits(
  duration.value,
  to.value,
  from.value,
  (value) => {
    format.value ? (number.value = format.value(value)) : (number.value = value)
  },
  complete.value
)
</script>
<style lang="less" scoped>
.count-to-common {
  display: inline-block;
}
</style>
