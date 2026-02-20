import { BaseEntity } from '@/shared/entities/base.entity'

export class Coupon extends BaseEntity {
  title: string

  description: string

  code: string

  expiration: Date

  // comment: '最大领取数量',
  maxReceiveCount: number

  count: number

  usedCount: number

  // comment: '优惠劵的类型，1代表按照百分比对产品打折，2代表在总额上减少多少',
  type: number

  //   '优惠劵使用的条件，如果类型为1，则没有条件，如果类型是2，则购物车中产品总额满足多少的时候进行打折。这里填写的是美元金额',
  condition: number

  //   '优惠劵的折扣，如果类型为1，这里填写的是百分比，如果类型是2，这里代表的是在总额上减少的金额，货币为美金',
  discount: number
}
