export interface UserInfo {
  accountId: number
  accountType: number // 2
  mallList: MallInfo[]
  maskMobile: any | null
}

interface MallInfo {
  mallId: number
  mallName: string
  managedType: number
  uniqueId: string
}
