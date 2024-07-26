import app from "@/global/app"
import { hasPermission } from "@/hooks/usePermission"

app.directive<HTMLElement, string>("permission", {
  mounted(el, { arg, value }) {
    const permissionName = value ?? arg

    if (!permissionName) return
    if (!hasPermission(permissionName)) el.remove()
  },
})
