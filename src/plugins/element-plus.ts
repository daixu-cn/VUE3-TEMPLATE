import type { ConfigProviderProps } from "element-plus"

export const ElementPlusConfig: Partial<ConfigProviderProps> = {
  button: { autoInsertSpace: true },
  message: { max: 3 },
  emptyValues: [undefined, null],
  valueOnClear: () => undefined,
}
