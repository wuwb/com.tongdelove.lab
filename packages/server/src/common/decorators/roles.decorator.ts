//Authorization decorator to be used on resolvers and controllers together with the jwt-guard

import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@/common/enums/role.enum';
import { ROLES_KEY } from '@/common/constants/auth.constants';

// 获取 role 对象的类型
export const Roles = (...roles: RoleEnum[]): CustomDecorator<string> => {
    return SetMetadata(ROLES_KEY, roles);
};
