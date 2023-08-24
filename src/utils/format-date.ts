/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-06-24 17:06:51
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 09:48:43
 * @FilePath: /vue3_tailwindcss/src/utils/format-date.ts
 */
/**
 * @description: 补零
 * @param {number} v 值
 * @param {number} size 位数
 * @return {*} 补零后的值
 */
function addZero(v: number, size: number) {
  for (let i = 0, len = size - (v + '').length; i < len; i++) {
    v = ('0' + v) as unknown as number
  }
  return v + ''
}

/**
 * @description: 格式化时间
 * @param {string} formatter 格式化字符串 
 * @return {string} 格式化后的时间
 */
const _formatNormalize = (formatter: string | Function) => {
  if (formatter instanceof Function) {
    return formatter
  }
  return (data: Date | string) => {
    console.log('data: ', data)
    let arrWeek = ['日', '一', '二', '三', '四', '五', '六']
    let date = new Date(data)
    let str = formatter
      .replace(/yyyy|YYYY/, date.getFullYear() as unknown as string)
      .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
      .replace(/mm|MM/, addZero(date.getMonth() + 1, 2))
      .replace(/m|M/g, (date.getMonth() + 1) as unknown as string)
      .replace(/dd|DD/, addZero(date.getDate(), 2))
      .replace(/d|D/g, date.getDate() as unknown as string)
      .replace(/hh|HH/, addZero(date.getHours(), 2))
      .replace(/h|H/g, date.getHours() as unknown as string)
      .replace(/ii|II/, addZero(date.getMinutes(), 2))
      .replace(/i|I/g, date.getMinutes() as unknown as string)
      .replace(/ss|SS/, addZero(date.getSeconds(), 2))
      .replace(/s|S/g, date.getSeconds() as unknown as string)
      .replace(/w/g, date.getDay() as unknown as string)
      .replace(/W/g, arrWeek[date.getDay()])
    return str
  }
}

/**
 * @description:  格式化时间
 * @param {Date | string} data  时间
 * @param {string} formatStr 格式化字符串
 * @return {string} 格式化后的时间
 */
export const formatDate = (data: Date | string, formatStr: string) => {
  // let format = _formatNormalize(formatStr)
  // return format(data)
  let arrWeek = ['日', '一', '二', '三', '四', '五', '六']
  let date = new Date(data)
  let str = formatStr
    .replace(/yyyy|YYYY/, date.getFullYear() as unknown as string)
    .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
    .replace(/mm|MM/, addZero(date.getMonth() + 1, 2))
    .replace(/m|M/g, (date.getMonth() + 1) as unknown as string)
    .replace(/dd|DD/, addZero(date.getDate(), 2))
    .replace(/d|D/g, date.getDate() as unknown as string)
    .replace(/hh|HH/, addZero(date.getHours(), 2))
    .replace(/h|H/g, date.getHours() as unknown as string)
    .replace(/ii|II/, addZero(date.getMinutes(), 2))
    .replace(/i|I/g, date.getMinutes() as unknown as string)
    .replace(/ss|SS/, addZero(date.getSeconds(), 2))
    .replace(/s|S/g, date.getSeconds() as unknown as string)
    .replace(/w/g, date.getDay() as unknown as string)
    .replace(/W/g, arrWeek[date.getDay()])
  return str
}
