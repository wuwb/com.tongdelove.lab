import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEnum } from '@/common/enums/role.enum';
import { ROLES_KEY_METADATA } from '@/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 反射获取角色信息
        const roles = this.reflector.get<RoleEnum[]>(ROLES_KEY_METADATA, context.getHandler());
        if (roles === undefined || !roles || roles.length === 0) {
            // 返回 true 表示有权限
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));

        if (user && user.roles && hasRole()) {
            // 返回 true 表示有权限
            return true;
        }

        // 返回 false 的时候可以抛出异常，在异常处理中进行跳转到登录的操作
        // return false;
        throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);
    }
}
