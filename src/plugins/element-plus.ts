import type { ConfigProviderProps } from "element-plus"
import root from "@/assets/styles/scss/theme/root.module.scss"

export const ElementPlusConfig: Partial<ConfigProviderProps> = {
  namespace: root.ns,
  button: { autoInsertSpace: true },
  message: { max: 3, grouping: true },
  emptyValues: [undefined, null],
  valueOnClear: () => undefined,
}
