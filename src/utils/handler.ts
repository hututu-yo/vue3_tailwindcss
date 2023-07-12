/*
 * @Description:
 * @Version: 1.0
 * @Autor: tu
 * @Date: 2023-04-13 09:59:29
 * @LastEditors: tu
 * @LastEditTime: 2023-04-13 16:09:57
 * @FilePath: /vue3_tailwindcss/src/utils/handler.ts
 */
import type { ComponentOptions, VNode } from 'vue'

// type ComponentPublicInstance = InstanceType<typeof ComponentPublicInstance>
export interface KeepAliveHandlerPrototype {
  cache: () => Map<any, any>
  unmount(vnode: VNode): void
  isCurrent(key: string): boolean
}
export class KeepAliveHandler {
  private _: KeepAliveHandlerPrototype = {} as KeepAliveHandlerPrototype
  constructor() {
    this._ = {} as KeepAliveHandlerPrototype
  }

  get keys() {
    const { cache } = this._
    if (!cache || !cache()) {
      return []
    }
    return [...cache().keys()]
  }

  //绑定keepAlive信息
  bind(keepAlive: ComponentOptions) {
    // if (keepAlive && keepAlive.$.__v_cache) {
    const sharedContext = keepAlive.$.ctx
    const instance = keepAlive.$
    const { suspense: parentSuspense, __v_cache: cache } = instance
    const {
      renderer: { um: unmount }
    } = sharedContext

    Object.assign(this._, {
      cache() {
        return cache
      },
      unmount(vnode: VNode) {
        resetShapeFlag(vnode)
        unmount(vnode, instance, parentSuspense, true)
      },
      isCurrent(key: string) {
        return keepAlive.$.subTree && keepAlive.$.subTree.key === key
      }
    })
    // } else {
    //
    // }
  }

  //删除指定key的缓存
  remove(key: string, reset: boolean = true) {
    pruneCache.call(this, (k) => key !== k, reset)
  }
  //清空
  clear() {
    pruneCache.call(this, () => false, false)
  }
}

function pruneCache(
  this: any,
  ...[filter, reset]: [filter: (key: string) => boolean, reset: boolean]
) {
  const { cache, unmount, isCurrent } = this._
  if (!cache || !cache()) {
    return
  }
  const c = cache()
  c.set = new Map().set
  c.forEach((vnode: VNode, key: string) => {
    if (!filter(key)) {
      if (isCurrent(key)) {
        //重写set，因为渲染函数可能会重新执行
        //这样就会导致缓存重新添加，导致清除失败
        if (reset) {
          c.set = function () {
            c.set = new Map().set
          }
        }
        resetShapeFlag(vnode)
      } else {
        unmount(vnode)
      }
      c.delete(key)
    }
  })
}

function resetShapeFlag(vnode: VNode) {
  let shapeFlag = vnode.shapeFlag
  if (shapeFlag & 256) {
    shapeFlag -= 256
  }
  if (shapeFlag & 512) {
    shapeFlag -= 512
  }
  vnode.shapeFlag = shapeFlag
}
