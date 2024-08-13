declare namespace Model {
  namespace Params {
    interface PermissionList extends Model.Params.Pagination {
      permissionName?: string
    }

    type PermissionAction = Partial<
      Pick<Model.Permission, "permissionId", "permissionName" | "permissions">
    >
  }
}
