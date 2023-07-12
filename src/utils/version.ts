/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-06-24 17:06:51
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 09:46:22
 * @FilePath: /vue3_tailwindcss/src/utils/version.ts
 */
/**
 * @description: 版本号自增
 * @param {string} version 版本号
 * @return {*} 版本号
 */
export const incrementVersion = (version: string) => {
  const parts = version.split('.')
  const lastPart = parseInt(parts[2])
  if (lastPart === 9) {
    parts[2] = '0'
    const middlePart = parseInt(parts[1])
    if (middlePart === 9) {
      parts[1] = '0'
      parts[0] = parseInt(parts[0]) + 1 + ''
    } else {
      parts[1] = '' + (middlePart + 1)
    }
  } else {
    parts[2] = '' + (lastPart + 1)
  }
  return parts.join('.')
}
