import type { ConfigProviderProps } from "element-plus"

export const ElementPlusConfig: Partial<ConfigProviderProps> = {
  button: { autoInsertSpace: true },
  message: { max: 3, grouping: true },
  emptyValues: [undefined, null],
  valueOnClear: () => undefined,
}
