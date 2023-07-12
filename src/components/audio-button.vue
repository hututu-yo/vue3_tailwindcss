<!--
 * @Description:  播放按钮
 * @Version: 1.0
 * @Author: tu
 * @Date: 2023-06-28 14:01:47
 * @LastEditors: tu
 * @LastEditTime: 2023-07-12 09:22:23
 * @FilePath: /vue3_tailwindcss/src/components/audio-button.vue
-->
<template>
  <div class="audio-button" :style="style">
    <div class="progress"></div>
    <div class="btn">
      <slot></slot>
    </div>
  </div>
  <!-- <svg viewBox="0 0 44 44" class="css-1kqr98c">
    <defs>
      <mask id="mask">
        <circle
          cx="22"
          cy="22"
          r="21.5"
          stroke-width="1px"
          stroke="white"
          fill="black"
          stroke-dasharray="180"
          stroke-dashoffset="360"
          class="css-1pryumr"
        ></circle>
      </mask>
    </defs>
    <circle cx="22" cy="22" r="22" fill="#17152F"></circle>
    <path
      d="M 22 0 A 22 22 0 1 0 22 44 A 22 22 0 1 0 22 0 Z M 22 1 A 21 21 0 1 1 22 43 A 21 21 0 1 1 22 1 Z"
      fill="#362E70"
    ></path>
    <foreignObject x="0" y="0" width="44" height="44" mask="url(#mask)">
      <div class="progress-box" :style="`--progress-value:${progress * 360}deg`"></div>
    </foreignObject>
  </svg> -->
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * @description: 进度 0-1
     */
    progress?: number
    /**
     * @description: 进度条宽度 默认 5px
     */
    progressWidth?: string
    /**
     * @description: 精度条背景色 默认 #362e70
     */
    progressBackgroundColor?: string
    /**
     * @description: 进度条开始颜色数值 默认 #362e70
     */
    progressStartColor?: string
    /**
     * @description: 进度条中间颜色数值 默认 #43fbdc
     */
    progressMiddleColor?: string
    /**
     * @description: 进度条结束颜色数值 默认 #00000000
     */
    progressEndColor?: string
    /**
     * @description: 中间背景色 默认 #17152f
     */
    middleBackgroundColor?: string
  }>(),
  {
    progress: 0,
    progressWidth: '5px',
    progressBackgroundColor: '#362e70',
    progressStartColor: '#362e70',
    progressMiddleColor: '#43fbdc',
    progressEndColor: '#00000000',
    middleBackgroundColor: '#17152f'
  }
)
const progress = toRef(props, 'progress')
const style = computed(() => {
  return {
    '--progress-value': `${progress.value * 360}deg`,
    '--progress-background-color': props.progressBackgroundColor,
    '--progress-width': props.progressWidth,
    '--progress-start-color': props.progressStartColor,
    '--progress-middle-color': props.progressMiddleColor,
    '--progress-end-color': props.progressEndColor,
    '--middle-background-color': props.middleBackgroundColor
  }
})
</script>
<style lang="less" scoped>
@progress-width: var(--progress-width);
@progress-background-color: var(--progress-background-color);
@progress-start-color: var(--progress-start-color);
@progress-middle-color: var(--progress-middle-color);
@progress-end-color: var(--progress-end-color);
@middle-background-color: var(--middle-background-color);

.audio-button {
  //  放大
  // transform: scale(10);
  width: 100%;
  height: 100%;
  background-color: var(--progress-background-color);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transform: rotate(-90deg);

  .btn {
    transform: rotate(90deg);
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 2 * @progress-width);
    height: calc(100% - 2 * @progress-width);
    background-color: var(--middle-background-color);
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    margin: @progress-width;
  }

  .progress {
    width: 100%;
    height: 100%;
    background-image: conic-gradient(from 90deg,
        var(--progress-start-color),
        var(--progress-middle-color) var(--progress-value),
        var(--progress-end-color) var(--progress-value));
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

// .css-1kqr98c {
//   .progress-box {
//     background-image: conic-gradient(
//       from 90deg,
//       rgb(54, 46, 112),
//       rgb(67, 251, 220) var(--progress-value),
//       rgba(0, 0, 0, 0) var(--progress-value)
//     );
//     width: 100%;
//     height: 100%;
//     transition: background-image 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   }
// }
</style>
