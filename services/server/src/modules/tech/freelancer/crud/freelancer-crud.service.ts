import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CrudService } from '@/core/crud/crud.service'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { FreelancerTaskMapType } from './freelancer-map-type.class'

@Injectable()
export class FreelancerCrudService extends CrudService<
  Prisma.FreelancerTaskDelegate<any>,
  FreelancerTaskMapType
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.freelancerTask)
  }

  async foo() {
    return await this.count({
      where: {},
    })
  }
}
