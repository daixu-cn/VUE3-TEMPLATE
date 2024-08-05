import i18n from "@/plugins/locale"
import type { Keys } from "@/locale/types"

export function t(key: Keys, options: Record<string, unknown> = {}) {
  return i18n.global.t(key, options)
}

export default i18n
