import { PermissionLevel, type Permission } from "@/router/types/permission"
import { ElIcon } from "element-plus"
import { Setting } from "@element-plus/icons-vue"

const SystemPermissions: Permission[] = [
  {
    path: "/system",
    label: "系统管理",
    icon: (
      <ElIcon>
        <Setting />
      </ElIcon>
    ),
    level: PermissionLevel.MENU,
    children: [
      {
        path: "/system/permission",
        label: "权限管理",
        level: PermissionLevel.MENU,
        children: [
          {
            path: "/system/permission/create",
            label: "功能操作-创建权限",
            level: PermissionLevel.ACTION,
          },
          {
            path: "/system/permission/edit",
            label: "功能操作-编辑权限",
            level: PermissionLevel.ACTION,
          },
          {
            path: "/system/permission/delete",
            label: "功能操作-删除权限",
            level: PermissionLevel.ACTION,
          },
        ],
      },
    ],
  },
]

export default SystemPermissions
