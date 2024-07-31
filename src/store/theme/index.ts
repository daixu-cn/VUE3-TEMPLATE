import { defineStore } from "pinia"
import { Mode, type State } from "./types"

const useThemeStore = defineStore("theme", {
  persist: true,
  state: (): State => {
    return {
      mode: Mode.SYSTEM,
      dark: matchMedia("(prefers-color-scheme: dark)").matches,
    }
  },
  actions: {
    init() {
      const media = matchMedia("(prefers-color-scheme: dark)")

      if (this.mode === Mode.SYSTEM) this.setMode(Mode.SYSTEM)
      else this.setMode(this.mode)

      media.addEventListener("change", () => {
        if (this.mode === Mode.SYSTEM) this.setMode(Mode.SYSTEM)
      })
    },
    setMode(mode: Mode) {
      const { matches } = matchMedia("(prefers-color-scheme: dark)")
      this.mode = mode
      this.dark = mode === Mode.SYSTEM ? matches : mode === Mode.DARK
      if (this.dark) document.documentElement.classList.add("dark")
      else document.documentElement.classList.remove("dark")
    },
    toggleMode() {
      this.setMode(this.dark ? Mode.LIGHT : Mode.DARK)
    },
  },
})

export default useThemeStore
