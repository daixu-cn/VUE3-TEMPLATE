import app from "@/global/app"
import { createI18n } from "vue-i18n"
import { messages } from "@/locale"

const i18n = createI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  legacy: false,
  allowComposition: true,
  messages,
})

app.use(i18n)
export default i18n
