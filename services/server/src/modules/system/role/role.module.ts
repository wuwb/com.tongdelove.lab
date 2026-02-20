import { Module, OnModuleInit } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './services/role.service'
import { AuthModule } from '@/modules/system/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule implements OnModuleInit {
  async onModuleInit() {
    console.log('role module loaded.')
  }
}
