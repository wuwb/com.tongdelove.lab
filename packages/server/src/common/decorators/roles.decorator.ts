//Authorization decorator to be used on resolvers and controllers together with the jwt-guard

import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY_METADATA } from '../constants';

// 获取 role 对象的类型
export const Roles = (...roles: RoleEnum[]): CustomDecorator<string> => {
    return SetMetadata(ROLES_KEY_METADATA, roles);
};
