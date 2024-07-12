import { defineStore } from "pinia"
import type { State } from "./types"
import type { UserModel } from "@/server/models/user/UserModel"

const useUserStore = defineStore("user", {
  persist: true,
  state: (): State => ({
    info: null,
    token: null,
    permission: [],
  }),
  actions: {
    setUser(info: UserModel) {
      this.info = info
      localStorage.setItem("username", info.userName)
    },
    setToken(token: string) {
      this.token = token
      sessionStorage.setItem("token", token)
    },
    setPermission(permission: string[]) {
      this.permission = permission
    },
    reset() {
      this.$reset()
      sessionStorage.removeItem("token")
    },
  },
})

export default useUserStore
