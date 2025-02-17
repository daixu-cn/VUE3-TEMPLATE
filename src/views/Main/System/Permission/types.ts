import type { Permission } from "@/router/types/permission"

export type Permissions = Array<Permission & { hasFullSelection?: boolean }>
