import app from "@/global/app"
import { setupI18n } from "@/plugins/locale"
import { setupRouter } from "@/plugins/route"
import { setupPinia } from "@/plugins/pinia"
import "@/plugins/dayjs"
import "@/plugins/check-update"

app.use(setupI18n).use(setupRouter).use(setupPinia)
