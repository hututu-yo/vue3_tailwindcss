/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-29 17:18:03
 * @LastEditors: tu
 * @LastEditTime: 2023-06-28 10:13:55
 * @FilePath: /vue3_tailwindcss/script/modules/assets-fs.js
 */
const fs = require('fs')
const path = require('path')
var dirs = [] // 保存所有的文件
function readdir(filePath = '../../src/assets/images', subPath = '') {
  // let filePath = '../src/assets/images'
  let data = fs.readdirSync(path.resolve(__dirname, filePath), 'utf-8')
  //
  data.forEach((item) => {
    let newFilePath = filePath + '/' + item
    let newSubPath = subPath ? subPath + '-' + item : item
    // 判断是否是文件夹
    if (fs.lstatSync(path.resolve(__dirname, newFilePath)).isDirectory()) {
      readdir(newFilePath, item)
    } else {
      // 不是文件夹
      dirs.push(newSubPath)
    }
  })
  return dirs
}
readdir('../../src/assets/images')

let newDirs = dirs.map((item) => {
  // 去除最后.后面后缀名
  // let name = item.replace(/\.\w+$/, '')
  // 去除最后. logo.png => logo-png
  let name = item.replace(/\./g, '-')
  //  - 转驼峰
  name = name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
  return name
})

// let type = newDirs.join("' | '") || ''
// let imagesFileObj = 'const imagesFileObj: ImagesFileObj = {\n'
// newDirs.map((item, index) => {
//   imagesFileObj += `  ${item}: null,\n`
// })
// imagesFileObj += '} as ImagesFileObj'

// fs.readFile(path.resolve(__dirname, '../../src/assets/images.ts'), 'utf-8', (err, data) => {
//   let newData = data.replace(
//     /type\s+ImagesFileModule\s+=\s*\|*\s+'\S*'(\s+\|+\s+('\S*')*)*/gm,
//     "type ImagesFileModule = '" + type + "'"
//   )
//   newData = newData.replace(
//     /const imagesFileObj: ImagesFileObj = {([\s\S]*)} as ImagesFileObj/gm,
//     imagesFileObj
//   )
//   fs.writeFile(path.resolve(__dirname, '../../src/assets/images.ts'), newData, (err) => {
//     if (err) {
//       console.log('写入图片文件失败:  ', err)
//     }
//   })
// })

let type = newDirs.join("'\n  | '") || ''
let imagesFileObj = ''
newDirs.map((item, index) => {
  imagesFileObj += `\n  ${item}: null,` // ${item}: imagesNameList[${index}][1],\n
})
imagesFileObj = imagesFileObj.replace(/,$/, '')
let newData = `type ImagesFileModule = \n  | '${type}'

type ImagesFileObj = {
  [key in ImagesFileModule]: any
}

const imagesFile: { [key: string]: any } = import.meta.glob('./images/**/**', {
  eager: true,
  import: 'default'
})
const imagesNameList = Object.entries(imagesFile)

const imagesFileObj: ImagesFileObj = {${imagesFileObj}
} as ImagesFileObj

imagesNameList.forEach((item) => {
  // let name = item[0].replace(\/\\..*\\//, '')
  let name = item[0].replace('./images/', '')
  // 去除最后.后面后缀名  logo.png => logo 这样不可以，因为有logo.png logo.jpg
  // name = name.replace(\/\\.\\w+$/, '')
  // 去除最后. logo.png => logo-png 这样可以，添加上文件后缀名
  name = name.replace(\/\\./g, '-')
  // / 转 -
  name = name.replace(\/\\\/\/g, '-')
  //  - 转驼峰
  name = name.replace(/-(\\w)/g, (all, letter) => letter.toUpperCase())
  imagesFileObj[name as ImagesFileModule] = item[1]
})

export default imagesFileObj
`
fs.writeFile(path.resolve(__dirname, '../../src/assets/images.ts'), newData, (err) => {
  if (err) {
    console.log('写入图片文件失败:  ', err)
  }
})
