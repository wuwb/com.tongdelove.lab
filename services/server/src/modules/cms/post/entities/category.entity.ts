import { BaseEntity } from '@/shared/entities/base.entity'

/**
 * 新闻报道只是一种分类
 */
export class CategoryEntity extends BaseEntity {
  label: string

  value: string

  order: number

    // comment: '只显示子级分类文章',
  onlyChild: boolean

  children: CategoryEntity[]

  parent: CategoryEntity
}
