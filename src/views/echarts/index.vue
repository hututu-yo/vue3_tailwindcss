<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:50:05
 * @LastEditors: tu
 * @LastEditTime: 2023-05-24 10:10:40
 * @FilePath: /vue3_tailwindcss/src/views/echarts/index.vue
-->
<template>
  <div class="echarts">
    <div class="box">
      <echarts-common :option="echartsOption" :data="{}" :isLoad="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import echartsCommon from '@/components/echarts-common.vue'
import type { ECharts, EChartsOption } from 'echarts'
const echartsOption = ref({})
onMounted(() => {
  setTimeout(() => {
    echartsOption.value = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        // 隐藏x轴刻度线
        axisLine: {
          show: true
        },
        //y轴刻度线
        axisTick: {
          show: false
        },
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {
        // 隐藏x轴刻度线
        axisLine: {
          show: true
        },
        //y轴刻度线
        axisTick: {
          show: false
        },
        //网格线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ],
      grid: {}
    }
  }, 2000)
})
</script>
<style lang="less" scoped>
.echarts {
  .box {
    width: 100%;
    height: 500px;
    // 渐变色
    background: linear-gradient(90deg, #b6c340 0%, #217e98 100%);
  }
}
</style>
