import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiAuthService } from './api-auth.service';
import { AccessEntity } from '@/modules/admin/system/access/entities/access.entity';
import { AccountRoleEntity } from '@/modules/admin/system/account/entities/account-role.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccessEntity,
      AccountRoleEntity,
    ]),
  ],
  providers: [ApiAuthService],
  exports: [ApiAuthService],
})
export class SharedModule { }
