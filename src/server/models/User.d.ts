declare namespace Model {
  namespace User {
    /** 用户数据 */
    interface Data {
      userId: string
      userName: string
      email: string
      role: number
      createdAt: string
      updatedAt: string
    }

    namespace Params {}
  }
}
