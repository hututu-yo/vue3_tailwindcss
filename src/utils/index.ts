/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-14 15:02:17
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 09:18:34
 * @FilePath: /vue3_tailwindcss/src/utils/index.ts
 */
/**
 * 生成随机字符串
 * @param {*} length 字符串长度
 * @param {*} chars 字符串类型可选值a、A、#、!
 * @returns String
 */
export const randomString = (length: number, chars: string) => {
  let mask = ''
  if (chars.indexOf('a') > -1) {
    mask += 'abcdefghijklmnopqrstuvwxyz'
  }
  if (chars.indexOf('A') > -1) {
    mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (chars.indexOf('#') > -1) {
    mask += '0123456789'
  }
  if (chars.indexOf('!') > -1) {
    mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  }
  let result = ''
  for (let i = length; i > 0; i -= 1) {
    result += mask[Math.floor(Math.random() * mask.length)]
  }
  return result
}

export interface IObject {
  [key: string]: any
}
/**
 * 过滤对象选中的空值(空字符串、null、undefined)
 * @param {object} obj 待处理对象
 * @returns object
 */
export function objectEmptyFilter(obj: IObject): IObject {
  const result: IObject = {}
  const keys: Array<string> = Object.keys(obj)
  keys.forEach((key) => {
    const value = obj[key]
    if (value || value === 0) {
      result[key] = value
    }
  })
  return result
}
