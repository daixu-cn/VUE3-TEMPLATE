import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    /** 当前路由标题，会替换 document.title */
    title?: string
    /** 当前路由是否需要校验权限 */
    auth?: boolean
    /** 当前路由权限路径，默认匹配路由 path，针对传参路由设置 */
    permission?: string
    /**
     * 是否缓存当前页面
     *
     * 仅当 路由的name === 组件的name 才会生效
     *
     * 在 vue 3.2.34 或以上的版本中，组件会自动根据文件名生成对应的 name 选项
     *
     * 如果两边的 name 值不一致，则需要手动进行修改
     */
    "keep-alive"?: boolean
  }
}
