import { Prisma } from '@prisma/client'

export class Category implements Prisma.CategoryUncheckedCreateInput {
  id?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  isDeleted?: boolean
  title: string
  type?: number
  status?: string
  description?: string
  slug: string
  keywords?: string
  pid?: number
  icon_url?: string
  pic_url?: string
  level?: string
  sort?: number
  articleId?: string
  createdBy?: string
  updatedBy?: string
  remark?: string
  version?: number
  label?: string
  value?: string
  order?: number
  onlyChild?: boolean
  parentId?: string
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
}
