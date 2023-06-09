import { AccessEntity } from '@/modules/system/access/entities/access.entity'
import { AccountEntity } from '@/modules/system/account/entities/account.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrismaModule } from '../database/prisma/prisma.module'
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
