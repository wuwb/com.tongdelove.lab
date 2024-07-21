export interface ITokenPayload {
  id: string
  login: string
  password: string
}

export interface ITokenService {
  createAccessToken: ({ id, login, password }: ITokenPayload) => Promise<string>
}
