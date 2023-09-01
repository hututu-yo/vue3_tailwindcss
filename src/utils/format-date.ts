/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-06-24 17:06:51
 * @LastEditors: tu
 * @LastEditTime: 2023-09-01 15:49:56
 * @FilePath: /vue3_tailwindcss/src/utils/format-date.ts
 */
/**
 * @description: 补零
 * @param {number} v 值
 * @param {number} size 位数
 * @return {*} 补零后的值
 */
function addZero(v: number | string, size: number): string {
  v = Number(v).toString()
  for (let i = 0, len = size - (v + '').length; i < len; i++) {
    v = '0' + v
  }
  return v + ''
}

/**
 * @description: 格式化时间
 * @param {string} formatter 格式化字符串 
 * @return {string} 格式化后的时间
 */
const _formatNormalize = (formatter: string | ((data: Date | string) => string)): (data: Date | string) => string => {
  if (formatter instanceof Function) {
    return formatter
  }
  return (data: Date | string) => {
    console.log('data: ', data)
    let arrWeek = ['日', '一', '二', '三', '四', '五', '六']
    let date = new Date(data)
    let str = formatter
      .replace(/yyyy|YYYY/, date.getFullYear().toString())
      .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
      .replace(/mm|MM/, addZero(date.getMonth() + 1, 2))
      .replace(/m|M/g, (date.getMonth() + 1).toString())
      .replace(/dd|DD/, addZero(date.getDate(), 2))
      .replace(/d|D/g, date.getDate().toString())
      .replace(/hh|HH/, addZero(date.getHours(), 2))
      .replace(/h|H/g, date.getHours().toString())
      .replace(/ii|II/, addZero(date.getMinutes(), 2))
      .replace(/i|I/g, date.getMinutes().toString())
      .replace(/ss|SS/, addZero(date.getSeconds(), 2))
      .replace(/s|S/g, date.getSeconds().toString())
      .replace(/w/g, date.getDay().toString())
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
export const formatDate = (data: Date | string, formatStr: string): string => {
  // let format = _formatNormalize(formatStr)
  // return format(data)
  let arrWeek = ['日', '一', '二', '三', '四', '五', '六']
  let date = new Date(data)
  let str = formatStr
    .replace(/yyyy|YYYY/, date.getFullYear().toString())
    .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
    .replace(/mm|MM/, addZero(date.getMonth() + 1, 2))
    .replace(/m|M/g, (date.getMonth() + 1).toString())
    .replace(/dd|DD/, addZero(date.getDate(), 2))
    .replace(/d|D/g, date.getDate().toString())
    .replace(/hh|HH/, addZero(date.getHours(), 2))
    .replace(/h|H/g, date.getHours().toString())
    .replace(/ii|II/, addZero(date.getMinutes(), 2))
    .replace(/i|I/g, date.getMinutes().toString())
    .replace(/ss|SS/, addZero(date.getSeconds(), 2))
    .replace(/s|S/g, date.getSeconds().toString())
    .replace(/w/g, date.getDay().toString())
    .replace(/W/g, arrWeek[date.getDay()])
  return str
}
