import app from "@/global/app"
import { createI18n } from "vue-i18n"
import enUS from "@/locale/languages/en-US.json"
import type { Messages } from "@/locale/types"

const i18n = createI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  legacy: false,
  allowComposition: true,
  messages: { "en-US": enUS } as Messages,
})

app.use(i18n)
export default i18n
