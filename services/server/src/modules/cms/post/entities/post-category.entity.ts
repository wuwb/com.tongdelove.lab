import { BaseEntity } from '@/shared/entities/base.entity'

export class PostCategoryEntity extends BaseEntity {
  postId: string

  categoryId: string
}
