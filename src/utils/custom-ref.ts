/*
 * @Description: 自定义ref [ custom ref ]
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-05-03 09:36:54
 * @LastEditors: tu
 * @LastEditTime: 2023-08-07 15:51:15
 * @FilePath: /vue3_tailwindcss/src/utils/custom-ref.ts
 */

import { customRef } from 'vue'

// 本地缓存ref
/**
 * @description:  本地缓存ref
 * @param {*} key  缓存key
 * @param {*} defaultValue  默认值
 */

export const useLocalCacheRef = <T>(key: string, defaultValue: T) => {
  const sessionStorageValue = JSON.parse(sessionStorage.getItem(key) || '{}')[key] ?? defaultValue
  const state = reactive({ value: sessionStorageValue })

  watchEffect(() => {
    const newValue = { [key]: state.value }
    sessionStorage.setItem(key, JSON.stringify(newValue))
  })

  return toRef(state, 'value')
}
// export const useLocalCacheRef = <T>(key: string, defaultValue: T) => {
//   return customRef<T>((track, trigger) => {
//     return {
//       get: () => {
//         let sessionStorageValue: T = JSON.parse(sessionStorage.getItem(key) || '{}')[key]
//         track()
//         return sessionStorageValue ?? defaultValue
//       },
//       set: (value) => {
//         let newValue = { [key]: value }
//         sessionStorage.setItem(key, JSON.stringify(newValue))
//         defaultValue = value
//         trigger()
//       },

//     }
//   })
// }

// export const useLocalCacheRef = <T>(key: string, defaultValue: T) => {
//   type Value = {
//     [key: string]: T;
//   };
//   let value: Value = JSON.parse(sessionStorage.getItem(key) || '{}');

//   // 使用 Proxy 对象监听数组的操作
//   const arrayHandler: ProxyHandler<Value> = {
//     get(target, prop, receiver) {
//       return Reflect.get(target, prop, receiver);
//     },
//     set(target, prop, value) {
      
//       // 调用原始的数组操作
//       const result = Reflect.set(target, prop, value);
//       // 手动触发 set 方法，更新引用的值
//       trigger();
//       return result;
//     },
//   };

//   function trigger() {
//     const newValueObj = value;
    
//     sessionStorage.setItem(key, JSON.stringify(newValueObj));
//   }

//   return customRef<T>((track, trigger) => {
//     return {
//       get: () => {
//         track();
//         const val = new Proxy(value, arrayHandler)[key] ?? defaultValue;
//         return val;
//       },
//       set: (newValue) => {
//         value[key] = newValue;
        
//         trigger();
//       },
//     }
//   });
// };