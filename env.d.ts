/// <reference types="vite/client" />
// 下面的代码项目初始化的时候没有，是自己添加的
// https://blog.csdn.net/ganyingxie123456/article/details/126265566
// https://blog.csdn.net/qq_31967569/article/details/127389728
// www.cnblogs.com/wisewrong/p/15971158.html
// 可以在代码中获取用户自定义环境变量的 TypeScript 智能提示
// 第一步：在tsconfig.json中添加 "types": ["vite/client"] ，用来提供import.meta.env 上 Vite 注入的环境变量的类型定义
// 第二步：加入下面代码
// 第三步：需要重启编辑器才可以生效，后面再用的时候，就可以 无限点 下去的，就有提示了
interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'dev' | 'prod' | 'sit'
  readonly VITE_TOKEN_KEY: string
  readonly VITE_VERSION: string
  // 更多环境变量
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
// 在使用ts开发的项目中，.d.ts 结尾的文件主要用于 TypeScript 识别.vue 文件，
// .vue 文件不是一个常规的文件类型，ts 是不能理解 vue 文件是干嘛的，这里就告诉 ts，
// vue 文件是这种类型的。没有这个文件中的declare声明文件，你会发现 import 的所有 vue 类型的文件都会报错。
// 并且js本身是没有类型的，ts的语言服务需要.d.ts文件来识别类型，这样才能做到相应的语法检查和智能提示
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 为了让 ts 识别 .mjs 文件，需要在 env.d.ts 中添加如下代码
declare module '*.mjs'  // 