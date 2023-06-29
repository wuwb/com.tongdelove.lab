import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository, getConnection } from 'typeorm';
import { CreateRoleDto } from './dto/create.role.dto';
import { UpdateRoleDto } from './dto/update.role.dto';
import { RoleResDto, RoleListResDto } from './dto/role.res.dto';
import { RoleReqDto } from './dto/role.req.dto';
import { PageEnum, StatusEnum } from '@/common/enums';
import { RoleEnum } from '@/common/enums/role.enum';
import { AccountRoleEntity } from '../account/entities/account-role.entity';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(AccountRoleEntity)
        private readonly accountRoleRepository: Repository<AccountRoleEntity>,
        private readonly prisma: PrismaService,
    ) { }

    /**
     * 创建角色
     */
    async createRole(createRoleDto: CreateRoleDto): Promise<string> {
        const { name, isDefault } = createRoleDto;
        const findNameResult = await this.roleRepository.findOne({ where: { name }, select: ['id'] });
        if (findNameResult) {
            throw new HttpException(`${name}当前角色已经存在,不能重复创建`, HttpStatus.OK);
        }
        // 如果是默认角色的时候要判断下
        if (Object.is(isDefault, RoleEnum.Default)) {
            const findDefault = await this.roleRepository.findOne({
                where: { isDefault },
                select: ['id'],
            });
            if (findDefault) {
                throw new HttpException('已经存在默认角色不能重复创建', HttpStatus.OK);
            }
        }
        const role = this.roleRepository.create(createRoleDto);
        await this.roleRepository.save(role);
        return '创建角色成功';
    }

    /**
     * 根据角色 id 删除角色
     */
    async destroyRoleById(id: string): Promise<string> {
        // 判断当前角色是否已经被占用(有账号绑定了该角色)
        const accountRoleFindResult = await this.accountRoleRepository.findOne({
            where: { roleId: id },
            select: ['id'],
        });
        if (accountRoleFindResult) {
            throw new HttpException('当前角色有账号与之绑定,不能直接删除', HttpStatus.OK);
        }
        const {
            raw: { affectedRows },
        } = await this.roleRepository.softDelete(id);
        if (affectedRows) {
            return '删除成功';
        } else {
            return '删除失败';
        }
    }

    // 根据角色 id 修改角色
    async modifyRoleById(id: string, updateRoleDto: UpdateRoleDto): Promise<string> {
        const { isDefault } = updateRoleDto;
        if (Object.is(isDefault, String(RoleEnum.Default))) {
            const findResult = await this.roleRepository.findOne({
                where: { isDefault },
                select: ['id'],
            });
            if (findResult?.id !== id) {
                throw new HttpException('默认角色只能有一个', HttpStatus.OK);
            }
        }
        const {
            raw: { affectedRows },
        } = await this.roleRepository.update(id, updateRoleDto);
        if (affectedRows) {
            return '修改成功';
        } else {
            return '修改失败';
        }
    }

    // 根据角色 id 查询角色
    async roleById(id: string): Promise<RoleResDto | null> {
        return this.roleRepository.findOne({
            where: {
                id,
            }
        });
    }

    async findByRoleId(roleId: string) {
        const users = await this.prisma.user.findMany({
            where: {
                id: roleId,
            }
        });
        if (!users.length) {
            throw new HttpException('No users belong to this role', 404);
        }
        return;
    }

    // 查询角色列表
    async roleList(roleReqDto: RoleReqDto): Promise<RoleListResDto> {
        const {
            limit = PageEnum.PAGE_NUMBER,
            page = PageEnum.PAGE_SIZE,
            name,
            status,
        } = roleReqDto;
        const queryConditionList: any = [];
        if (name) {
            queryConditionList.push('role.name LIKE :name');
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        if (
            /^\d$/.test(String(status)) &&
            [StatusEnum.NORMAL, StatusEnum.FORBIDDEN].includes(Number(status))
        ) {
            queryConditionList.push('role.status = :status');
        }
        const queryCondition = queryConditionList.join(' AND ');
        const [data, total] = await getConnection()
            .createQueryBuilder(RoleEntity, 'role')
            .where(queryCondition, { name: `%${name}%`, status })
            .skip((limit - 1) * page)
            .take(page)
            .printSql()
            .getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
        };
    }

    async findRoles(queryRoleDto) {
        const {
            limit = PageEnum.PAGE_NUMBER,
            page = PageEnum.PAGE_SIZE,
        } = queryRoleDto;
        const skip = (page - 1) * limit;
        const data = await this.prisma.role.findMany({
            skip,
            take: limit, 
        });
        const total = await this.prisma.role.count({
        });
        return {
            data,
            total,
            page,
        };
    }

    // 查询所有角色
    async roleAll(): Promise<RoleResDto[]> {
        return this.roleRepository.find();
    }

    // 根据角色 id 查询角色
    async findById(id: string): Promise<Role | null> {
        return this.prisma.role.findUnique({
            where: {
                id,
            }
        });
    }

    async findMany(roleReqDTO) {

    }

    async findAll(): Promise<Role[]> {
        return this.prisma.role.findMany();
    }

    async create(createRoleDto) { }

    async updateById(id: string, updateRoleDTO) { }

    async removeById(id: string) { }
}
