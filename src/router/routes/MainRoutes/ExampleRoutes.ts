import type { RouteRecordRaw } from "vue-router"

const ExampleRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/example/form",
    name: "EditableForm",
    component: () => import("@/views/Main/Example/EditableForm.vue"),
    meta: { title: "可编辑表单" },
  },
  {
    path: "/example/upload",
    name: "Upload",
    component: () => import("@/views/Main/Example/Upload.vue"),
    meta: { title: "文件上传" },
  },
]

export default ExampleRoutes
