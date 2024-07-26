import { createRouter, createWebHistory } from "vue-router"
import { BASE_URL } from "@/global/env"
import routes from "@/router/routes"
import useTitle from "@/router/hooks/useTitle"
import useProgress from "@/router/hooks/useProgress"
import useUserStore from "@/store/user"
import { hasPermission } from "@/hooks/usePermission"

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (to.meta.auth && (!user.token || !hasPermission(to.path))) {
    next({ name: "Login" })
  } else {
    next()
  }

  useProgress()
})

router.afterEach(to => {
  useProgress(false)
  useTitle(to)
})

export default router
