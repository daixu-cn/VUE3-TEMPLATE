import type { RouteLocationNormalized } from "vue-router"
import { TITLE } from "@/global/env"
import routes from "@/router/routes"
import NProgress from "nprogress"

/**
 * @description 获取所有 keep-alive: true 的路由名称
 * @return {string[]} 路由名称数组
 */
export function getKeepAliveNames(): string[] {
  return routes
    .flat(Infinity)
    .filter(route => route.meta?.["keep-alive"])
    .map(route => route.name as string)
}

/**
 * @description 进度条控制
 * @param {boolean} show 是否显示进度条
 * @return {}
 */
export function setProgress(show: boolean = true): void {
  if (show) {
    NProgress.start()
  } else {
    NProgress.done()
  }
}

/**
 * @description 设置页面标题
 * @param {RouteLocationNormalized} route 路由
 * @return {}
 */
export function setTitle({ meta: { title } }: RouteLocationNormalized): void {
  document.title = title ? `${title} | ${TITLE}` : TITLE
}
