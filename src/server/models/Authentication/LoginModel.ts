import type { UserModel } from "@/server/models/user/UserModel"

export interface LoginModel {
  token: string
  user: UserModel
  permissions: string[]
}
