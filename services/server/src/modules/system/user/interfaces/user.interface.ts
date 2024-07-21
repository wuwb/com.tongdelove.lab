export interface User {
  readonly username: string
  readonly email: string
  readonly token: string
  readonly bio: string
  readonly image?: string
}

export interface UserRO {
  user: User
}
