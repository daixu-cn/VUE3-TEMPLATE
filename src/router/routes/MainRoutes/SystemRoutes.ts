import type { RouteRecordRaw } from "vue-router"

const SystemRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/system",
    name: "System",
    meta: { auth: true },
    redirect: "/system/permission",
    children: [
      {
        path: "/system/permission",
        name: "Permission",
        component: () => import("@/views/Main/System/Permission/Permission.vue"),
        meta: { title: "权限管理" },
      },
    ],
  },
]

export default SystemRoutes
