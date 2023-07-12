/*
 * @Description: 
 * @Version: 1.0
 * @Author: tu
 * @Date: 2023-07-11 17:50:45
 * @LastEditors: tu
 * @LastEditTime: 2023-07-11 17:53:39
 * @FilePath: /vue3_tailwindcss/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import compressPlugin from 'vite-plugin-compression'
import Inspect from 'vite-plugin-inspect' // vite 调试插件

import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

function incrementVersion(version: string) {
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

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const envPath = `./vite_env/.env.${mode}`
  const envConfig = dotenv.parse(fs.readFileSync(envPath))

  return {
    // 打包路径
    base: './', // 打包路径
    envDir: './vite_env', // 环境变量目录
    server: {
      // 服务配置
      host: '0.0.0.0',
      // 代理
      proxy: {
        '/monkey-user': {
          target: 'http://monkeydata.teamscorpio.cn',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/monkey-user/, '')
        }
      }
    },
    plugins: [
      // 插件
      Inspect({
        // 指定检查的文件
        // files: ['src/**/*.{vue,ts,tsx}']
      }),
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          /\.vue\?mpType/, // .vue
          /\.md$/ // .md
        ],

        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dirs: ['./src/stores', './src/utils', './src/type', './src/hooks'],
        // 添加类型声明导入

        dts: './auto-imports.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver()

          // (componentName) => {
          //   // where `componentName` is always CapitalCase
          //   if (componentName.startsWith('Dv'))
          //     return { name: componentName.slice(2), from: '@kjgl77/datav-vue3' }
          // }
        ],
        dirs: ['./src/components', './src/views/*/component'],
        dts: './components.d.ts'
      }),
      compressPlugin({
        //gzip静态资源压缩
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 5120, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
      })
    ],
    resolve: {
      // 解析
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    esbuild: {
      // esbuild配置
      drop: ['console', 'debugger']
    },
    build: {
      // 打包配置
      rollupOptions: {
        output: {
          entryFileNames: `[name]-[hash]-${mode}-${envConfig.VITE_VERSION}.js`,
          chunkFileNames: `chunks/[name]-[hash]-${mode}-${envConfig.VITE_VERSION}.js`,
          assetFileNames: `assets/[name]-[hash]-${mode}-${envConfig.VITE_VERSION}.[ext]`,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
          plugins: [
            {
              name: 'my-plugin',
              generateBundle() {
                envConfig.VITE_VERSION = incrementVersion(envConfig.VITE_VERSION)
                const envConfigFile = Object.keys(envConfig)
                  .map((key) => `${key}=${envConfig[key]}`)
                  .join('\n')
                fs.writeFileSync(envPath, envConfigFile)
              }
            }
          ]
        }
      }
    }
  }
})
