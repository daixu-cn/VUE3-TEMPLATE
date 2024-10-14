declare namespace Model {
  namespace Base {
    /** 响应格式 */
    interface Response<T = any> {
      code: number
      message: string
      data: T
    }

    /** 分页查询 */
    interface Pagination {
      page: number
      size: number
    }

    interface List<T extends Array<any> = any[]> extends Pagination {
      total: number
      list: T
      [key: string]: any
    }

    /** 表格列表 */
    interface Table<T extends Array<any> = any[]> extends Pagination {
      list: T
      total: number
      loading: boolean
      [key: string]: any
    }

    /** 信息查询 */
    interface Info<T = any> {
      loading?: boolean
      data?: T
      [key: string]: any
    }
  }
}
