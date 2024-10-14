import http from "@/server"

/**
 * @description 登录
 * @param {object} params 参数
 * @return 返回结果
 */
export function signIn(params: Model.Auth.Params.Login) {
  return http.post<Model.Auth.Data>("/login.json", params)
}
