import type { UserModel } from "@/server/models/user/UserModel"

export interface State {
  info: UserModel | null
  token: string | null
  permission: string[]
}
