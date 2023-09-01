/*
 * @Description: 请求配置
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2022-11-03 14:44:34
 * @LastEditors: tu
 * @LastEditTime: 2023-08-22 14:49:48
 * @FilePath: /vue3_tailwindcss/src/libs/config.ts
 */
export interface UrlMapConfig {
  /**
   * 服务器环境地址 dev  [ server environment address dev ]
   */
  dev: string
  /**
   * 服务器环境地址 sit  [ server environment address sit ]
   */
  sit: string
  /**
   * 服务器环境地址 prod  [ server environment address prod ]
   */
  prod: string
}

const { VITE_APP_ENV }: { VITE_APP_ENV: keyof UrlMapConfig } = import.meta.env

const SERVICE_URL_MAP: UrlMapConfig = {
  dev: 'http://127.0.0.1:3007',
  sit: 'http://data.houkoc.com',
  prod: 'http://data.houkoc.com'
}

const BFF_URL_MAP: UrlMapConfig = {
  dev: 'http://127.0.0.1:3007',
  sit: 'http://data.houkoc.com',
  prod: 'http://data.houkoc.com'
}

const DOMAIN_URL_MAP: UrlMapConfig = {
  dev: 'http://127.0.0.1:3007',
  sit: 'http://data.houkoc.com',
  prod: 'http://data.houkoc.com'
}

/**
 * 前端服务链接前缀
 * @type {string}
 */
const serviceURL: string = `${SERVICE_URL_MAP[VITE_APP_ENV]}`

/**
 * BFF接口链接前缀
 * @type {string}
 */
const bffServiceURL: string = `${BFF_URL_MAP[VITE_APP_ENV]}/bff-admin`

/**
 * 域接口链接前缀
 * @type {string}
 */
const domainServiceURL: string = `${DOMAIN_URL_MAP[VITE_APP_ENV]}`

export default {
  serviceURL,
  bffServiceURL,
  domainServiceURL
}
