import type { RouteRecordRaw } from "vue-router"
import ExampleRoutes from "./ExampleRoutes"
import SystemRoutes from "./SystemRoutes"

const MainRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/views/Main/Layout/Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Main/Home/Home.vue"),
        meta: { title: "首页", auth: true },
      },
      ...ExampleRoutes,
      ...SystemRoutes,
    ],
  },
]

export default MainRoutes
