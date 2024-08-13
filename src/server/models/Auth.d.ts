declare namespace Model {
  interface Login {
    token: string
    user: Model.User
    permissions: string[]
  }
}
