export const enum LoginLogTypeEnum {
  LOGIN_USERNAME = 100, // 用户名登录
  LOGIN_SOCIAL = 101, // 社交登录
  LOGIN_EMAIL = 102, // 邮箱登录
  LOGIN_MOBILE = 103, // 手机登录
  LOGIN_SMS = 104, // 短信登录

  LOGOUT_SELF = 200, // 主动退出
  LOGOUT_DELETE = 202, // 强制退出
}
