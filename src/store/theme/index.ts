import { defineStore } from "pinia"
import { useDark } from "@vueuse/core"
import type { State } from "./types"

const useThemeStore = defineStore("theme", {
  state: (): State => ({
    dark: useDark(),
  }),
})

export default useThemeStore
