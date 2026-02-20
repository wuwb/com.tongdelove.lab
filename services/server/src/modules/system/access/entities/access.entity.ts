import { BaseEntity } from '@/shared/entities/base.entity'

export class AccessEntity extends BaseEntity {
  moduleName: string

  type: string

  actionName: string

  
  apiName: string


  icon: string


  url: string


  method: string


  parentId: string


  sort: number

 
  status: number

 
  description: string
}
