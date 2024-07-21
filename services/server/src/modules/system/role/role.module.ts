import { Module, OnModuleInit } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './services/role.service'
import { RoleEntity } from './entities/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRoleEntity } from '../account/entities/account-role.entity'
import { AuthModule } from '@/modules/system/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, AccountRoleEntity]),
    AuthModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule implements OnModuleInit {
  async onModuleInit() {
    console.log('role module loaded.')
  }
}
