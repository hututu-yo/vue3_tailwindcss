/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-14 15:02:17
 * @LastEditors: tu
 * @LastEditTime: 2023-09-01 15:56:53
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

/**
 * @description:  获取选项label 
 * @param {T extends Record<string, any>} options 选项
 * @param {any} value 选项值
 * @param {K extends keyof T} key 选项key
 * @param {K extends keyof T} k 选项label
 * @return {*}
 */
export const optionsLabelGetter = <T extends Record<string, any>, K extends keyof T>(options: T[], value: any, key: K = 'value' as K, k: K = 'value' as K): any => {
  const option = options.find((u: T) => u[key] === value)
  return option ? option[k] : ''
}
