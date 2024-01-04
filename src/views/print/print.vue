<!--
 * @Description: 
 * @Version: 1.0
 * @Author: tu
 * @Date: 2024-01-04 14:45:29
 * @LastEditors: tu
 * @LastEditTime: 2024-01-04 16:51:44
 * @FilePath: /vue3_tailwindcss/src/views/print/print.vue
-->
<template>
  <div class='print'>
    <div id="cck">
      <h1 style="color: aqua;">打印测试</h1>
      <p>打印测试</p>
      <p>打印测试</p>
      <p>打印测试</p>
      <p>打印测试</p>
    </div>
    <iframe style="position: absolute; top: -1000px; left: -1000px; width: 100%" id="print" ref="printRef"
      src="http://localhost:5173/home">
    </iframe>
    <el-button @click="printHTML">打印HTML</el-button>
  </div>
</template>

<script lang='ts' setup>
import print from 'print-js'
const printRef = ref<HTMLIFrameElement | null>(null)
const printHTML = () => {
  print({
    printable: 'cck',
    type: 'html',
    scanStyles: true,
    header: '打印测试',
    //   style: `
    //   #cck {
    //   width: 100%;
    //   height: 100%;
    //   background-color: #fff;
    //   padding: 20px;
    //   box-sizing: border-box;
    // }

    // #cck h1 {
    //   font-size: 20px;
    //   text-align: center;
    // }

    // #cck p {
    //   font-size: 16px;
    //   text-align: center;
    // }  `
  })
  // printRef.value?.contentWindow?.print()
}

</script>
<style lang='less' scoped>
.print {
  width: 100%;
  height: 100%;

  #cck {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }

  #cck h1 {
    font-size: 20px;
    text-align: center;
  }

  #cck p {
    font-size: 16px;
    text-align: center;
  }
}
</style>