import type { UserModel } from "@/server/models/User/UserModel"

export interface State {
  info: UserModel | null
  token: string | null
  permission: string[]
}
