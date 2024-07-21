import { Prisma } from '@prisma/client'
import { CrudMapType } from '@/core/crud/interfaces/crud-map-type.interface'

export class FreelancerTaskMapType implements CrudMapType {
  aggregate: Prisma.FreelancerTaskAggregateArgs
  count: Prisma.FreelancerTaskCountArgs
  create: Prisma.FreelancerTaskCreateArgs
  delete: Prisma.FreelancerTaskDeleteArgs
  deleteMany: Prisma.FreelancerTaskDeleteManyArgs
  findFirst: Prisma.FreelancerTaskFindFirstArgs
  findMany: Prisma.FreelancerTaskFindManyArgs
  findUnique: Prisma.FreelancerTaskFindUniqueArgs
  update: Prisma.FreelancerTaskUpdateArgs
  updateMany: Prisma.FreelancerTaskUpdateManyArgs
  upsert: Prisma.FreelancerTaskUpsertArgs
}
