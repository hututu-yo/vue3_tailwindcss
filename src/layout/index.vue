<!--
 * @Description:  页面布局 [ page layout ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-10 13:51:54
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 10:08:21
 * @FilePath: /vue3_tailwindcss/src/layout/index.vue
-->
<template>
  <div class="layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '208px'">
        <div class="links" :style="isCollapse ? 'width: 64px;' : ''">
          <img :src="imagesFileObj.logoPng" class="logo-img" />
          <span v-show="!isCollapse" class="title-text">危象报警管理系统</span>
        </div>
        <Aside :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <Header v-model:isCollapse="isCollapse"></Header>
        </el-header>
        <div class="page">
          <Page></Page>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

import imagesFileObj from '@/assets/images'
import Header from './header.vue'
import Aside from './aside.vue'
import Page from './page.vue'
console.log('imagesFileObj: ', imagesFileObj);


const isCollapse = useLocalCacheRef('isCollapse', false)
</script>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;

  .links {
    display: flex;
    align-items: center;
    background-color: #002140;
    width: 208px;
    height: 60px;
    line-height: 60px;
    // padding-left: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 17px;

    transition: width 0.3s;
    -moz-transition: width 0.3s;
    /* Firefox 4 */
    -webkit-transition: width 0.3s;
    /* Safari and Chrome */
    -o-transition: width 0.3s;
    /* Opera */

    .logo-img {
      margin: auto;
      // margin-right: 10px;
      width: 30px;
      height: 30px;
    }

    .title-text {
      // color: var(--text-color);
      padding-right: 15px;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  ::v-deep(.el-container) {
    height: 100vh;

    .el-aside {
      transition: width 0.3s;
      -moz-transition: width 0.3s;
      /* Firefox 4 */
      -webkit-transition: width 0.3s;
      /* Safari and Chrome */
      -o-transition: width 0.3s;
      /* Opera */
    }

    .el-header {
      padding: 0;
    }
  }

  .page {
    width: 100%;
    height: calc(100% - 60px);
    // padding-top: 6px;
  }
}
</style>
