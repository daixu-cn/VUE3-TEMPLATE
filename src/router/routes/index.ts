import type { RouteRecordRaw } from "vue-router"
import AuthRoutes from "@/router/routes/AuthRoutes"
import MainRoutes from "@/router/routes/MainRoutes"
import ErrorRoutes from "@/router/routes/ErrorRoutes"

const routes: Readonly<RouteRecordRaw[]> = [...AuthRoutes, ...MainRoutes, ...ErrorRoutes]

export default routes
