class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refreshToken
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.accessToken
  }
}

export default TokenService
