import app from "@/global/app"
import { hasPermission } from "@/tools/permission"

app.directive<HTMLElement, PermissionPaths>("permission", {
  mounted(el, { value }) {
    if (!value) return
    if (!hasPermission(value)) el.remove()
  },
})
