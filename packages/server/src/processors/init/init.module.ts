import { AccessEntity } from '@/modules/admin/system/access/entities/access.entity'
import { AccountEntity } from '@/modules/admin/system/account/entities/account.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrismaModule } from '../prisma/prisma.module'
import { InitService } from './init.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      AccessEntity,
    ]),
    PrismaModule,
  ],
  providers: [InitService],
  exports: [InitService],
})
export class InitModule { }
