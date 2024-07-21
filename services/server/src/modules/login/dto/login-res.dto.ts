import { UserInfo } from '../interface/UserInfo'

export class ResImageCaptchaDto {
  /* base64图片编码 */
  img: string

  /* uuid码 */
  uuid: string
}

export class LoginResDto extends UserInfo {
  /* token密匙 */
  accessToken: string
}

export class UserInfoResDto {
  /* 权限标识 */
  permissions: string[]

  /* 角色标识 */
  roles: string[]

  /* 用户信息 */
  user: any
}
