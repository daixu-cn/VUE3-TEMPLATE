import type { RouteRecordRaw } from "vue-router"

const AuthRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Auth/Signup/Signup.vue"),
    meta: {
      title: "注册",
    },
  },
]

export default AuthRoutes
