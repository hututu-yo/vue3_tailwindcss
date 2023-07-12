/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-17 17:13:38
 * @LastEditors: tu
 * @LastEditTime: 2023-06-29 10:28:15
 * @FilePath: /vue3_tailwindcss/src/utils/rolling-digits.ts
 */
/**
 * @description:
 * @param {number} duration  持续时间 ms
 * @param {number} to   目标值
 * @param {number} from   起始值
 * @param {function} callback     回调函数  value: 当前值  timer: 定时器  remaining: 剩余时间
 * @param {function} complete     完成回调函数
 * @return {number}  value  当前值
 */
export const rollingDigits = (
  duration: number,
  to: number,
  from: number,
  callback: (value: number, timer: number, remaining: number) => void,
  complete?: () => void
) => {
  let timer: null | number = null
  const difference = to - from // 总差值
  const perTick = difference / duration // 每一帧的差值
  const start = new Date().getTime() // 开始时间
  let value = from // 当前值
  function tick() {
    const now = Date.now() // 当前时间
    const time = now - start // 当前时间 - 开始时间 = 已经过去的时间
    // 剩余时间
    const remaining = duration - time
    if (time > duration) {
      // 如果已经过去的时间大于持续时间，直接赋值为目标值
      value = to
      callback(value, timer as number, remaining)
      complete && complete()
    } else {
      // 否则，计算当前值，然后递归调用
      timer = requestAnimationFrame(tick)
      value = from + perTick * time
      callback(value, timer, remaining)
    }
  }
  tick()
}

// rollingDigits原型上添加一个cancel方法，用于取消动画
rollingDigits.cancel = (timer: number) => {
  cancelAnimationFrame(timer)
}
