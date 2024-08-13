declare namespace Model {
  interface Base<T = any> {
    code: number
    message: string
    data: T
  }

  interface BaseList<T = any> {
    total: number
    list: T[]
  }
}
