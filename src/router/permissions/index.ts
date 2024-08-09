import type { Permission } from "@/router/types/permission"
import HomePermissions from "@/router/permissions/HomePermissions"
import ExamplePermission from "@/router/permissions/ExamplePermission"
import SystemPermissions from "@/router/permissions/SystemPermissions"

const permissions: Permission[] = [...HomePermissions, ...ExamplePermission, ...SystemPermissions]

export default permissions
