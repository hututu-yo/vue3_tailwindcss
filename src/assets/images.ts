type ImagesFileModule = 
  | 'pngLogoPng'
  | 'svgVueSvg'

type ImagesFileObj = {
  [key in ImagesFileModule]: any
}

const imagesFile: { [key: string]: any } = import.meta.glob('./images/**/**', {
  eager: true,
  import: 'default'
})
const imagesNameList = Object.entries(imagesFile)

const imagesFileObj: ImagesFileObj = {
  pngLogoPng: null,
  svgVueSvg: null
} as ImagesFileObj

imagesNameList.forEach((item) => {
  // let name = item[0].replace(/\..*\//, '')
  let name = item[0].replace('./images/', '')
  // 去除最后.后面后缀名  logo.png => logo 这样不可以，因为有logo.png logo.jpg
  // name = name.replace(/\.\w+$/, '')
  // 去除最后. logo.png => logo-png 这样可以，添加上文件后缀名
  name = name.replace(/\./g, '-')
  // / 转 -
  name = name.replace(/\//g, '-')
  //  - 转驼峰
  name = name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
  imagesFileObj[name as ImagesFileModule] = item[1]
})

export default imagesFileObj
