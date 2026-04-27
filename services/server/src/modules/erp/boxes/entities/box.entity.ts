import {
  BOX_TYPE,
  PAPER_TYPE,
  LID_TYPE,
  BOTTOM_TYPE,
  DETAIL_TYPE,
} from '../constact'
import { BaseEntity } from '@/shared/entities/base.entity'

// 包装
export class BoxEntity extends BaseEntity {
    // comment: '盒子类型',
  boxType: BOX_TYPE

    // comment: '纸张类型',
  paperType: PAPER_TYPE

    // comment: '盒盖类型',
  lidType: number

    // comment: '盒底部类型',
  bottomType: number

    // comment: '细节类型',
  detailType: number

    // comment: '盒子名称',
  title: string // 根据前面 4 个属性计算得出

  updateName() {
    this.title = `${this.boxType}_${this.lidType}_${this.detailType}_${this.bottomType}`
  }

  // 添加三张图片
    // comment: '三张主图',
  imgList: string[]

    // comment: '销量',
  salesCount: number
}
