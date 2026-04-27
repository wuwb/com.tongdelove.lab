import { UserEntity } from '@/modules/system/user/entities/user.entity'
import { CommentEntity } from './comment.entity'
import { BaseEntity } from '@/shared/entities/base.entity'

// 创建索引https://typeorm.io/#/indices，https://typeorm.biunav.com/zh/indices.html#%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95
export class PostEntity extends BaseEntity {
  slug: string

  title: string

  keyword: string

  description: string

  content: string

  status: boolean

  tagList: string[]

  author: UserEntity

  comments: CommentEntity[]

  favoriteCount: number

    // comment: '是否通过审核', // 0 未通过、1 通过
  audit: boolean
}
