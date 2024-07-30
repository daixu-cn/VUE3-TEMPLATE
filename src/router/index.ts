import { createRouter, createWebHistory } from "vue-router"
import { BASE_URL } from "@/global/env"
import routes from "@/router/routes"
import useUserStore from "@/store/user"
import { setTitle, setProgress } from "@/tools/router"
import { hasPermission } from "@/tools/permission"

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

  setProgress()
})

router.afterEach(to => {
  setProgress(false)
  setTitle(to)
})

export default router
