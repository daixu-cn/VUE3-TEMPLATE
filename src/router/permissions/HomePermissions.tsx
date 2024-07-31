import { PermissionLevel } from "@/router/types/permission"
import type { Permission } from "@/router/types/permission"
import { Icon } from "vue-iconify"

const HomePermissions: Permission[] = [
  {
    path: "/home",
    label: "首页",
    icon: <Icon href="icon-push" />,
    level: PermissionLevel.MENU,
  },
  {
    path: "/example",
    label: "全局组件",
    icon: <Icon href="icon-menu-list" />,
    level: PermissionLevel.MENU,
    children: [
      {
        path: "/example/chart",
        label: "主题/图表",
        level: PermissionLevel.MENU,
      },
      {
        path: "/example/form",
        label: "可编辑表单",
        level: PermissionLevel.MENU,
      },
      {
        path: "/example/upload",
        label: "文件上传",
        level: PermissionLevel.MENU,
      },
    ],
  },
]

export default HomePermissions
