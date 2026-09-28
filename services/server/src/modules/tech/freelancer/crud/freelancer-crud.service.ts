import { Injectable } from '@nestjs/common'
import { count } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'

@Injectable()
export class FreelancerCrudService {
  constructor(private readonly drizzle: DrizzleService) {}

  async foo() {
    const res = await this.drizzle.db
      .select({ value: count() })
      .from(freelancerTask)
    return res[0]?.value ?? 0
  }

  async findMany(args?: any) {
    return this.drizzle.db
      .select()
      .from(freelancerTask)
      .limit(args?.take ?? 10)
      .offset(args?.skip ?? 0)
  }
}
