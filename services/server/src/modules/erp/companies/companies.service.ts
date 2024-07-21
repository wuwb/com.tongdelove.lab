import { Injectable, Logger } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Prisma } from '@prisma/client'

enum CompaniesType {
  SUPPLY = 1,
}

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name)

  constructor(private prisma: PrismaService) {}

  create(param: Prisma.CompanyCreateInput) {
    return 'This action adds a new company'
  }

  async createSupply(param: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: param,
    })
  }

  async findAll(query) {
    const take = query.take || 10
    const skip = query.skip || 0
    const keyword = query.keyword || ''

    const total = await this.prisma.company.count()

    const data = await this.prisma.company.findMany({
      skip: skip,
      take: take,
      where: {},
      orderBy: {
        name: 'desc',
      },
    })

    return {
      data,
      total,
    }
  }

  async findSupplies(query) {
    const take = query.take || 10
    const skip = query.skip || 0
    const keyword = query.keyword || ''

    const total = await this.prisma.company.count()

    const data = await this.prisma.company.findMany({
      skip: skip,
      take: take,
      where: {
        type: CompaniesType.SUPPLY, //
      },
      orderBy: {
        name: 'desc',
      },
    })

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
