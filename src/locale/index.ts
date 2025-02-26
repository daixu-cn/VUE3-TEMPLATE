import enUS from "@/locale/languages/en-US.json"
import type { Locales } from "@/locale/types"
import type { Messages } from "@/locale/types"

export const messages: Messages = {
  "en-US": enUS,
}

const locales: Locales[] = [
  { label: "English", language: "en-US" },
  { label: "简体中文", language: "zh-CN" },
  { label: "日本語", language: "ja-JP" },
]

export default locales
