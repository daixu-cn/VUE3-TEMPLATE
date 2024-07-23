import { ref } from "vue"
import { random } from "lodash-es"

/**
 * @description 虚拟进度
 * @param {number} start 起始进度:5 范围:0-99
 * @param {function} callback 进度变化回调
 * @return {object} 返回当前进度和暂停函数
 */
export default function useVirtualProgress(
  start: number = 5,
  callback?: (progress: number) => void,
) {
  if (start <= 0) throw new Error("The start progress must be greater than 0!")

  const progress = ref(start)
  let timer: NodeJS.Timeout | null = setInterval(() => {
    const value = progress.value + random(0, 10, true)
    if (value >= 99) {
      stop()
      return
    }

    progress.value = parseFloat(value.toFixed(2))
    callback?.(progress.value)
  }, 300)

  function stop() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  return {
    progress,
    stop,
  }
}
