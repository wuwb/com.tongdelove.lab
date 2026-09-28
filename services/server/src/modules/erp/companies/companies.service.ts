import { Injectable, Logger } from '@nestjs/common'
import { desc, eq, count } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { company } from '@/core/database/drizzle/schema'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

enum CompaniesType {
  SUPPLY = 1,
}

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  create(param: any) {
    return 'This action adds a new company'
  }

  async createSupply(param: any) {
    const [created] = await this.drizzle.db
      .insert(company)
      .values(param as any)
      .returning()
    return created
  }

  async findAll(query: any) {
    const take = query?.take || 10
    const skip = query?.skip || 0
    const keyword = query?.keyword || ''

    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(company)
    const total = Number(totalRes[0]?.value ?? 0)

    const data = await this.drizzle.db
      .select()
      .from(company)
      .orderBy(desc(company.name))
      .limit(take)
      .offset(skip)

    return {
      data,
      total,
    }
  }

  async findSupplies(query: any) {
    const take = query?.take || 10
    const skip = query?.skip || 0
    const keyword = query?.keyword || ''

    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(company)
      .where(eq(company.type, CompaniesType.SUPPLY))
    const total = Number(totalRes[0]?.value ?? 0)

    const data = await this.drizzle.db
      .select()
      .from(company)
      .where(eq(company.type, CompaniesType.SUPPLY))
      .orderBy(desc(company.name))
      .limit(take)
      .offset(skip)

    return {
      data,
      total,
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} company`
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`
  }

  remove(id: string) {
    return `This action removes a #${id} company`
  }
}
