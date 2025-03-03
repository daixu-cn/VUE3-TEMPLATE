import { createI18n } from "vue-i18n"
import { messages } from "@/locale"
import type { App } from "vue"

export const i18n = createI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  legacy: false,
  allowComposition: true,
  messages,
})

export function setupI18n(app: App<Element>) {
  app.use(i18n)
}
