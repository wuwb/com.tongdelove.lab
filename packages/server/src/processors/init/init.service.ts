import { AccessEntity } from '@/modules/admin/system/access/entities/access.entity';
import { AccountEntity } from '@/modules/admin/system/account/entities/account.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitService {
    private readonly logger = new Logger(InitService.name);


    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        @InjectRepository(AccessEntity)
        private readonly accessRepository: Repository<AccessEntity>,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) { }

    onModuleInit() {
        this.logger.log('init onModuleInit ')
        // this.initAccount();
        this.initAccess();
        this.initAccessPrisma();
    }

    /**
     * @Description: 初始化账号
     */
    private async initAccount(): Promise<void> {
        const username = this.configService.get('defaultAccount');
        const password = this.configService.get('defaultPassword');

        const isExist = await this.accountRepository.findOne({
            where: {
                username
            }
        });
        if (!isExist) {
            const account = this.accountRepository.create({
                username, password,
                isSuper: 1
            });
            await this.accountRepository.save(account);
        }
    }

    /**
     * @Description: 初始化资源
     */
    private async initAccess(): Promise<void> {
        const accessList: any[] = [
            {
                moduleName: '系统管理',
                parentId: '0',
                url: 'system',
                type: 1,
                sort: 6,
            },
            {
                actionName: '账号管理',
                url: 'system/account',
                parentId: '1',
                type: 2,
                sort: 3,
            },
            {
                actionName: '角色管理',
                url: 'system/role',
                parentId: '1',
                type: 2,
                sort: 4,
            },
            {
                actionName: '资源管理',
                url: 'system/access',
                parentId: '1',
                type: 2,
                sort: 5,
            },
            {
                url: '/api/v1/admin/account',
                parentId: '2',
                type: 3,
                sort: 1,
                apiName: '账号列表',
                method: 'GET',
            },
            {
                url: '/api/v1/admin/account',
                parentId: '2',
                type: 3,
                sort: 2,
                apiName: '创建账号',
                method: 'POST',
            },
            {
                url: '/api/v1/admin/account/*',
                parentId: '2',
                type: 3,
                sort: 3,
                apiName: '根据ID删除账号',
                method: 'DELETE',
            },
            {
                url: '/api/v1/admin/account/*',
                parentId: '2',
                type: 3,
                sort: 4,
                apiName: '根据ID修改账号',
                method: 'PATCH',
            },
        ];
        // 如果不存在的时候就插入数据
        const isExist = await this.accessRepository.count();
        if (!isExist) {
            // 批量插入数据
            await this.accessRepository.insert(accessList);
        }
    }

    private async initAccessPrisma(): Promise<void> {
        const accessList: any[] = [
            {
                moduleName: '系统管理',
                parentId: '0',
                url: 'system',
                type: 1,
                sort: 6,
            },
            {
                actionName: '账号管理',
                url: 'system/account',
                parentId: '1',
                type: 2,
                sort: 3,
            },
            {
                actionName: '角色管理',
                url: 'system/role',
                parentId: '1',
                type: 2,
                sort: 4,
            },
            {
                actionName: '资源管理',
                url: 'system/access',
                parentId: '1',
                type: 2,
                sort: 5,
            },
            {
                url: '/api/v1/admin/account',
                parentId: '2',
                type: 3,
                sort: 1,
                apiName: '账号列表',
                method: 'GET',
            },
            {
                url: '/api/v1/admin/account',
                parentId: '2',
                type: 3,
                sort: 2,
                apiName: '创建账号',
                method: 'POST',
            },
            {
                url: '/api/v1/admin/account/*',
                parentId: '2',
                type: 3,
                sort: 3,
                apiName: '根据ID删除账号',
                method: 'DELETE',
            },
            {
                url: '/api/v1/admin/account/*',
                parentId: '2',
                type: 3,
                sort: 4,
                apiName: '根据ID修改账号',
                method: 'PATCH',
            },
        ];
        // 如果不存在的时候就插入数据
        const isExist = await this.prisma.access.findFirst();
        if (!isExist) {
            // 批量插入数据
            await this.prisma.access.createMany({
                data: accessList,
            });
        }
    }
}
