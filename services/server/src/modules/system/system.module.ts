import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { MODULE_PATH } from '@nestjs/common/constants'

import { AccountEntity } from './account/entities/account.entity';
import { AccountLastLoginEntity } from './account/entities/account.last.login.entity';
import { RoleEntity } from './role/entities/role.entity';
import { AccountRoleEntity } from './account/entities/account-role.entity';
import { AccessEntity } from './access/entities/access.entity';
import { RoleAccessEntity } from './role/entities/role-access.entity';

import { AccountController } from './account/account.controller';
import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller';
import { LoginController } from './account/login.controller';
import { AccountRoleController } from './account/account-role.controller';
import { MenusController } from './access/menus.controller';
import { RoleAccessController } from './role/role-access.controller';

// service
import { AccountService } from './account/account.service';
import { AccessService } from './access/access.service';
import { RoleService } from './role/services/role.service';
import { LoginService } from './account/login.service';
import { AccountRoleService } from './account/account-role.service';
import { MenusService } from './access/menus.service';
import { RoleAccessService } from './role/services/role-access.service';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity, AccountLastLoginEntity, AccountRoleEntity, RoleEntity, AccessEntity, RoleAccessEntity]),
        forwardRef(() => AuthModule),
        RoleModule,
    ],
    controllers: [
        AccountController,
        RoleController,
        AccessController,
        LoginController,
        AccountRoleController,
        MenusController,
        RoleAccessController,
    ],
    providers: [AccountService, AccessService, RoleService, LoginService, AccountRoleService, MenusService, RoleAccessService],
    exports: [AccountService],
})
export class SystemModule { }
// 路由前缀 作用该模块下全部的控制器
// Reflect.defineMetadata(MODULE_PATH, 'admin', SystemModule);
