<!--
 * @Description:  echarts组件 [ echarts component ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:33:00
 * @LastEditors: tu
 * @LastEditTime: 2023-05-23 17:23:22
 * @FilePath: /vue3_tailwindcss/src/components/echarts-common.vue
-->
<template>
  <div class="echarts-common" v-resize="resize">
    <div class="echarts-box" ref="echartsRef" v-bind="$attrs"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, onMounted, useSlots, useAttrs } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'
import { useDebounceFn } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    /**
     *  echarts配置项 [ echarts configuration item ]
     */
    option?: EChartsOption
    /**
     *  是否显示加载动画 [ show loading animation ]
     */
    isLoad?: boolean
    /**
     *  加载动画配置项 [ loading animation configuration item ]
     */
    loadingOption?: object
  }>(),
  {
    option: {} as () => EChartsOption,
    isLoad: false,
    loadingOption: {} as () => object
  }
)
const slots = useSlots()
const attrs = useAttrs() // 获取组件上的属性

const option = toRef<EChartsOption, any>(props, 'option')
const isLoad = toRef(props, 'isLoad')
const echartsOption = ref<EChartsOption>({})

const echartsRef = ref<HTMLElement | null>(null)
let echartsInstance: ECharts | null = null

const setOption = () => {
  const optionData: EChartsOption = {
    ...(option.value || {}),
    ...echartsOption.value,
    ...attrs
  } as EChartsOption
  echartsInstance?.setOption(optionData)
  if (Object.keys(option.value || {}).length > 0) {
    echartsInstance?.hideLoading()
  }
}
const showLoading = () => {
  echartsInstance?.showLoading({
    text: 'loading...', // 加载loading文字 [ loading text ]
    color: '#c23531', // 加载loading颜色 [ loading color ]
    textColor: '#000', // 加载loading文字颜色 [ loading text color ]
    maskColor: 'rgba(255, 255, 255, 0.2)', // 加载loading背景颜色 [ loading background color ]
    zlevel: 0, // 背景层的zlevel [ zlevel of background layer ]

    // fontSize: 55,    // 字体大小。从 `v4.8.0` 开始支持。
    // showSpinner: true,    // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
    // spinnerRadius: 100,   // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
    // lineWidth: 20,    // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
    // fontWeight: 'normal',  // 字体粗细。从 `v5.0.1` 开始支持。
    // fontStyle: 'normal',      // 字体风格。从 `v5.0.1` 开始支持。
    // fontFamily: 'sans-serif',   // 字体系列。从 `v5.0.1` 开始支持。

    ...props.loadingOption // 加载loading配置项 [ loading configuration item ]
  })
}

onMounted(() => {
  echartsInstance = echarts.init(echartsRef.value as HTMLElement)
  if (isLoad.value) {
    showLoading()
  }
  setOption()
})

onUpdated(() => {
  // showLoading()
  setOption()
  // echartsInstance?.hideLoading()
})
onUnmounted(() => {
  echartsInstance?.dispose()
})
const debouncedFn = useDebounceFn((val: Function) => {
  val()
}, 100)
const resize = (e: any) => {
  debouncedFn(() => {
    echartsInstance?.resize()
    echartsRef.value?.querySelector('div')?.style.setProperty('width', '100%')
  })
}
</script>
<style lang="less" scoped>
.echarts-common {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .echarts-box {
    width: 100%;
    height: 100%;
  }
}
</style>
