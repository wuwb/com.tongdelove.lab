import { Exclude } from 'class-transformer'
import { HashPassword } from 'wordpress-hash-node'
import { isMobilePhone, isEmail } from 'class-validator'
import { BaseEntity } from '@/shared/entities/base.entity'
import { usernameReg } from '@/common/constants/reg.constant'

export class AccountEntity extends BaseEntity {
  username: string

  password: string

  mobile: string

  // comment: '邮箱',
  email: string

  avatar: string

  // comment: '状态,0表示禁止,1表示正常',
  status: number

  // comment: '平台:0表示普通用户(没权限),1表示为运营管理,2表示入住商家',
  platform: number

  // comment: '是否为超级管理员1表示是,0表示不是',
  isSuper: number

  makePassword() {
    if (this.password) {
      this.password = HashPassword(this.password)
    }
  }

  generateUserNameOrEmailOrMobile() {
    if (this.username) {
      this.mobile =
        this.mobile && isMobilePhone(this.mobile, 'zh-CN')
          ? this.mobile
          : `_${this.username}`
      this.email =
        this.email && isEmail(this.email) ? this.email : `_${this.username}`
    } else if (this.mobile) {
      this.username =
        this.username && usernameReg.test(this.username)
          ? this.username
          : `_${this.mobile}`
      this.email =
        this.email && isEmail(this.email) ? this.email : `_${this.mobile}`
    } else if (this.email) {
      this.username =
        this.username && usernameReg.test(this.username)
          ? this.username
          : `_${this.email}`
      this.mobile =
        this.mobile && isMobilePhone(this.mobile, 'zh-CN')
          ? this.mobile
          : `_${this.email}`
    }
  }

  formatResponseData() {
    this.mobile = isMobilePhone(this.mobile, 'zh-CN') ? this.mobile : ''
    this.email = isEmail(this.email) ? this.email : ''
    this.username = usernameReg.test(this.username) ? this.username : ''
  }
}
