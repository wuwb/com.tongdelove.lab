import { IpToAddressService } from '@/core/tencent-map/ip-to-address.service'

export class AccountLastLoginEntity {
  id: string

  accountId: string

  lastLoginIp: string | null

  lastLoginAddress: string | null

  lastLoginTime: Date

  async generateLastLoginAddress() {
    // 调用第三方,根据ip地址查询到地址
    const ipToAddressService = new IpToAddressService()
    if (this.lastLoginIp) {
      this.lastLoginAddress = await ipToAddressService.IpToAddress(
        this.lastLoginIp
      )
    }
  }
}
