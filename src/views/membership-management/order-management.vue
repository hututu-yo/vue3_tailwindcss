<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 16:31:15
 * @LastEditors: tu
 * @LastEditTime: 2023-06-29 16:00:40
 * @FilePath: /vue3_tailwindcss/src/views/membership-management/order-management.vue
-->
<template>
  <div class="order-management">
    <div class="btn" @click="pause">
      <AudioButton :progress="progress" progressWidth="3px">
        <template v-if="isPause">
          <svg
            width="48"
            height="52"
            viewBox="0 0 48 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.4128 19.9235L10.7099 0.944024C9.60922 0.316187 8.3616 -0.00946005 7.09393 0.000209219C5.82626 0.00987849 4.58377 0.354519 3.49286 0.999072C2.43004 1.60581 1.54704 2.48252 0.933564 3.54016C0.32009 4.59779 -0.00200222 5.79865 9.36479e-06 7.02076V44.9797C-0.00200222 46.2018 0.32009 47.4027 0.933564 48.4603C1.54704 49.518 2.43004 50.3947 3.49286 51.0014C4.58388 51.6457 5.82633 51.9901 7.09393 51.9998C8.36154 52.0095 9.60912 51.684 10.7099 51.0565L44.4128 32.077C45.4998 31.476 46.4057 30.5954 47.0365 29.5268C47.6673 28.4582 48 27.2405 48 26.0002C48 24.7599 47.6673 23.5422 47.0365 22.4737C46.4057 21.4051 45.4998 20.5245 44.4128 19.9235Z"
              fill="#54E0BD"
            ></path>
          </svg>
        </template>
        <template v-else>
          <svg
            width="36"
            height="48"
            viewBox="0 0 36 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 0C2.23858 0 0 2.23858 0 5V43C0 45.7614 2.23858 48 5 48C7.76142 48 10 45.7614 10 43V5C10 2.23858 7.76142 0 5 0ZM31 0C28.2386 0 26 2.23858 26 5V43C26 45.7614 28.2386 48 31 48C33.7614 48 36 45.7614 36 43V5C36 2.23858 33.7614 0 31 0Z"
              fill="#54E0BD"
            ></path>
          </svg>
        </template>
      </AudioButton>
      {{ tiem }}
    </div>
  </div>
  <!-- <video preload="auto" src="https://c.taihe.com/res/assets_file/assets/empty.mp3"></video> -->
</template>

<script lang="ts" setup>
const progress = ref(0) // 进度
const tiem = ref(0) // 时间
const isPause = ref(false) // 是否暂停
const timer = ref<number | null>() // 定时器
const d = ref(2000) // 一轮持续时间
const duration = ref(d.value) // 剩余持续时间
let fun = () =>
  rollingDigits(
    duration.value,
    1,
    progress.value,
    (e, t, r) => {
      duration.value = r
      timer.value = t
      progress.value = e
      tiem.value = Math.floor(e * 60)
    },
    () => {
      progress.value = 0
      duration.value = d.value
      fun()
    }
  )

const pause = () => {
  // 清楚rolling
  isPause.value = !isPause.value
  if (isPause.value) {
    rollingDigits.cancel(timer.value as number)
  } else {
    fun()
  }
}
fun()
</script>
<style lang="less" scoped>
.order-management {
  background: url('https://app.ogimi.ai/static/media/Bg.fe50444d.svg') center center/ cover
    no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    width: 160px;
    height: 160px;
    cursor: pointer;
  }
  audio {
    display: inline !important;
    width: 10px;
    height: 10px;
  }
}
</style>
