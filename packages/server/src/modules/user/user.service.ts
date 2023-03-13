import { Injectable, HttpException, Logger, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '@/processors/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { MyHttpException } from '@/common/exceptions/my-http.exception';
import { QQService } from '@/utils/helper/qq.service';
import { generateRandomValue } from '@/utils';
import { ConfigService } from '@nestjs/config';
import UserRole from './entities/user-role.entity';
import { IUserService } from './IUserService';

@Injectable()
export class UserService implements IUserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,

        private readonly prisma: PrismaService,

        private qqService: QQService,
    ) { }

    // typeorm

    /**
     * 根据用户名查找已经启用的用户
     * @param login 
     */
    async tfindByLogin(login: string): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({
            login: login,
            status: 1,
        });
    }

    async tfindByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new HttpException('A user with this email does not exist.', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    /**
     * 更新个人信息
     * @param id 
     * @param info 
     */
    async updateAccountInfo(id: string, info): Promise<void> {
        const user = await this.userRepository.findOneBy({
            id,
        });
        if (isEmpty(user)) {
            throw new MyHttpException(10017);
        }
        const data = {
            ...(info.nickName ? { nickName: info.nickName } : null),
            ...(info.avatar ? { avatar: info.avatar } : null),
            ...(info.email ? { email: info.email } : null),
            ...(info.phone ? { phone: info.phone } : null),
            ...(info.qq ? { qq: info.qq } : null),
            ...(info.remark ? { remark: info.remark } : null),
        }

        // 自动获取 QQ 头像，todo，提供手动设置头像的功能
        if (!info.avatar && info.qq) {
            // 如果qq不等于原qq，则更新qq头像
            if (info.qq !== user.qq) {
                data.avatar = await this.qqService.getAvatar(info.qq);
            }
        }
        await this.userRepository.update(id, data);
    }

    async tcreate(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        const salt = bcrypt.genSaltSync(10);
        // user.salt = salt;
        user.pass = bcrypt.hashSync(user.pass, salt);

        return this.userRepository.save(user)
            .then((res) => {
                return {
                    id: res.id
                };
            })
            .catch(err => {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            });
    }

    // 添加用户
    async tcreate2(param: CreateUserDto): Promise<void> {
        const exists = await this.userRepository.findOne({
            where: {
            }
        });

        if (!isEmpty(exists)) {
            throw new MyHttpException(10001);
        }

        await this.entityManager.transaction(async (manager) => {
            const salt = generateRandomValue(32);

            // 查找配置的初始密码
            const initPassword = await this.configService.get('prisma.initPassword');

            const password = '';
            const u = manager.create(UserEntity, {
                departmentId: param.departmentId,
                login: param.login,
                pass: password,
                nicename: 'TD_xxx', // 自动生成，用于显示在链接中
                email: param.email,
                phone: param.phone,
            });
            const result = await manager.save(u);
            const { roles } = param;
            const insertRoles = roles.map((e) => {
                return {
                    roleId: e,
                    userId: result.id,
                };
            });
            // 分配角色
            await manager.insert(UserRole, insertRoles);
        });
    }

    /**
     * 获取用户信息
     * @param email 
     */
    async getAccountInfo(id: string): Promise<any> {
        const user = await this.userRepository.findOneBy({
            id,
        });

        if (isEmpty(user)) {
            throw new MyHttpException(10017);
        }

        return {
            login: user.login,
            nicename: user.nicename,
        };
    }

    // prisma
    async count<T extends Prisma.UserFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
    ): Promise<number> {
        return this.prisma.user.count(args);
    }

    async findAll(): Promise<User[]> {
        return []
    }

    async findMany<T extends Prisma.UserFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
    ): Promise<User[]> {
        return this.prisma.user.findMany(args);
    }

    async findOne<T extends Prisma.UserFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
    ) {
        this.logger.log(`findOne args: ${args}`);
        return this.prisma.user.findUnique(args);
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findByLogin(login: string): Promise<User | null> {
        this.logger.log('login: ', login);
        return this.prisma.user.findUnique({
            where: {
                login,
            },
        });
    }

    async findByResetToken(resetKey: string) {
        return this.prisma.user.findFirst({
            where: {
                resetKey,
            },
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new HttpException('A user with this email does not exist.', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findByIdentifier(identifier: string): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        login: identifier,
                    },
                    {
                        email: identifier,
                    }
                ],
            },
        });

        if (user) {
            return user;
        }

        throw new HttpException('A user with this username/email does not exist.', HttpStatus.NOT_FOUND);
    }

    async findByResetKey() { }

    async findByUsername() { }

    // 创建普通账号，创建谷歌登录账号
    async create<T extends Prisma.UserCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
    ): Promise<User> {
        return this.prisma.user.create<T>(args);
    }

    async update<T extends Prisma.UserUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
    ): Promise<User> {
        return this.prisma.user.update<T>(args);
    }

    async updateById(id: string, data) {
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
        return updatedUser;
    }

    async updateByRemoveActivationKey(id) {
        let undefinedActivationKey;
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                activationKey: undefinedActivationKey,
            },
        });
    }

    async delete<T extends Prisma.UserDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
    ): Promise<User> {
        return this.prisma.user.delete(args);
    }

    async remove(where: Partial<Prisma.UserWhereUniqueInput>): Promise<User> {
        const user = await this.findOne({ where });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.prisma.user.delete({
            where,
        });
    }

    async removeById(id: string): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    // others

    async existsByUsername() { }

    async existsByEmail() { }

    async getProfileImageBuffer() { }

    async uploadProfileImage() { }

    async deleteProfileImage() { }


    // get relations

    async getVotes() {
        // 
    }

    async getCurrentUserId() {
        //
    }

    async getUserOption(option, user) {
        if (!user) {
            user = this.getCurrentUserId();
        }
    }

    async banOrUnbanUser() {

    }

    async verifyUpdatedEmail(token: string) { }

    async disableUser() {

    }

    async activateUser() {

    }

    // 发送激活邮件
    async sendActivationMail() {

    }

}
