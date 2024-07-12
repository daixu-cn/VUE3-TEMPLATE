export interface BaseModel<T = any> {
  code: number
  message: string
  data?: T
}

export interface BaseListModel<T = any> {
  total: number
  list: T[]
}
