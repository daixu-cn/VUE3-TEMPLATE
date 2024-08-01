import type { CSSProperties } from "vue"

export interface AutoScaleScreenProps {
  width?: number
  height?: number
  wait?: number
  transformOrigin?: CSSProperties["transform-origin"]
  // 是否全屏
  fullScreen?: boolean
}
