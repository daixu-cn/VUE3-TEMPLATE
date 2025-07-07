import root from "@/assets/styles/scss/theme/root.module.scss"

/**
 * 获取当前屏幕相对于设计稿的缩放比例 (取宽高中较小值)。
 * @param designWidth 设计稿宽度
 * @param designHeight 设计稿高度
 * @returns 缩放比例
 */
export function getScale() {
  const _WidthScale = document.documentElement.clientWidth / parseFloat(root["design-width"])
  const _HeightScale = document.documentElement.clientHeight / parseFloat(root["design-height"])
  return Math.min(_WidthScale, _HeightScale)
}

/**
 * 将设计稿尺寸按照缩放比例转换为实际像素值。
 * @param size 设计稿尺寸 (单位:px)
 * @returns 实际像素值 (单位:px)
 */
export function toPX(size: number | string) {
  return parseFloat(String(size)) * getScale()
}
