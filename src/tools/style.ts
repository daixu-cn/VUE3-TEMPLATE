/**
 * @description 获取样式变量前缀
 * @param { HTMLElement } element 元素 (默认: document.documentElement)
 * @return {string} 样式变量前缀
 */
export function getStylePrefix(element: HTMLElement = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue("--prefix")
}

/**
 * @description 获取样式变量值
 * @param { string } property 样式变量名
 * @param { HTMLElement } element 元素 (默认: document.documentElement)
 * @return {string} 样式变量值
 */
export function getStyleVariable(
  property: string,
  element: HTMLElement = document.documentElement,
): string {
  const style = getComputedStyle(element)
  return style.getPropertyValue(`${getStylePrefix()}-${property}`)
}
