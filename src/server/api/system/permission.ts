import http from "@/server"

/**
 * @description 获取权限列表
 * @param {object} params 参数
 * @return 返回结果
 */
export function getPermissionList(params: Model.Params.PermissionList) {
  return http.post<Model.BaseList<Model.Permission>>("/permission.json", params)
}

/**
 * @description 更新权限
 * @param {string} permissionId 权限ID
 * @param {object} params 参数
 * @return 返回结果
 */
export function updatePermission(params: Model.Params.PermissionAction) {
  return http.post("/action.json", params)
}

/**
 * @description 删除权限
 * @param {string} permissionId 权限ID
 * @return 返回结果
 */
export function deletePermission(permissionId: string) {
  return http.delete("/action.json", { permissionId })
}
