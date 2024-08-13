import type { UserModel } from "@/server/models/User/UserModel"

export interface LoginModel {
  token: string
  user: UserModel
  permissions: string[]
}
