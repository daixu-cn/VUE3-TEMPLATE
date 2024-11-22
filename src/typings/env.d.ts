interface ImportMetaEnv {
  /** 预览端口 */
  readonly VITE_APP_PORT: string
  /** 站点标题 */
  readonly VITE_APP_SITE_TITLE: string
  /** 站点作者 */
  readonly VITE_APP_SITE_AUTHOR: string
  /** 站点关键词 */
  readonly VITE_APP_SITE_KEYWORDS: string
  /** 站点描述 */
  readonly VITE_APP_SITE_DESCRIPTION: string
  /** 公共基础路径 */
  readonly VITE_APP_BASE_URL: string
  /** 服务请求地址 */
  readonly VITE_APP_BASE_API: string
  /** SVG 图标前缀 */
  readonly VITE_APP_ICON_PREFIX: string
  /** SVG 图标路径 - 阿里巴巴矢量图标库 */
  readonly VITE_APP_ICON_ICONFONT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
