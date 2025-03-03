import { defineStore } from "pinia"
import { i18n } from "@/plugins/locale"
import type { Language } from "@/locale/types"
import type { State } from "./types"

const useLocaleStore = defineStore("locale", {
  persist: true,
  state: (): State => {
    return {
      language: "en-US",
    }
  },
  actions: {
    async setLanguage(language: Language) {
      const messages = await import(`@/locale/languages/${language}.json`)
      i18n.global.setLocaleMessage(language, messages.default)
      i18n.global.locale.value = language
      this.language = language
    },
  },
})

export default useLocaleStore
