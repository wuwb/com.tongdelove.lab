import { Injectable, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { Md5Service } from '@/utils/helper/helper.service.md5';
import { PrismaService } from '@/processors/prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import { MailService } from '../mail/mail.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserVerificationService } from '@/modules/user/user-verification.service';
import { UserInfo } from './UserInfo';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    // 储存到缓存的前缀
    private cachePrefix: string;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly md5Service: Md5Service,
        private readonly redisService: RedisService,
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly userVerificationService: UserVerificationService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
    ) {
        this.cachePrefix = this.configService.get('jwt.cache_prefix', 'jwt:');
    }

    // jwt 登录，登录成功后，根据配置重新生成 token
    async login(credentials: any): Promise<UserInfo> {
        this.logger.log('credentials: ', credentials);

        const { login, username, password } = credentials;

        // 根据登录信息获取用户信息
        const user = await this.validateUser(
            credentials.username,
            credentials.password
        );
        if (!user) {
            throw new UnauthorizedException("The passed credentials are incorrect");
        }
        const accessToken = await this.tokenService.createAccessToken({
            id: user.id,
            login: username,
            password,
        });
        return {
            ...user,
            accessToken,
        };
    }

    /**
     * 注册
     */
    async register(requestBody: any): Promise<any> {
        console.log('requestBody: ', requestBody);
        const {
            username,
            password,
            repassword,
            email,
        } = requestBody;

        if (password !== repassword) {
            throw new HttpException(
                '两次密码输入不一致',
                400,
            );
        }

        // 用户已经存在，
        // 判断是否激活，已激活提示用户登录，
        // 未激活，提示重新发送激活邮件。
        const user = await this.userService.findByLogin(username);
        if (user) {
            throw new HttpException(
                '用户已存在',
                HttpStatus.EXPECTATION_FAILED
            );
        }

        // 用户不存在，创建用户

        // const hasher = new PasswordHash()
        // const userPass = hasher.build(password);

        const userPass = this.passwordService.hash(password);

        const newActivationKey = uuidv4();

        const result = await this.prisma.$transaction(async (prisma) => {
            const createdUser = await this.userService.create({
                data: {
                    login: username,
                    pass: userPass, // 废弃
                    password: userPass,
                    email,
                    activationKey: newActivationKey,
                    roles: [],
                }
            });

            const timeout = setTimeout(async () => {
                await this.userService.updateByRemoveActivationKey(createdUser.id);
            }, 30 * 60 * 1000);


            const sendMail = await this.mailService.sendActivationKeyEmail(createdUser, newActivationKey);

            // 邮件发送成功后开始计时清除计时器
            await this.schedulerRegistry.addTimeout(`clear-activationKey-${createdUser.id}`, timeout);

            // 普通注册不需要，第三方注册需要绑定 acouunt
            // const createdAccount = await this.accountService.create({
            //   provider: 'email',
            // });

            return createdUser;
        });
        const { accessToken, refreshToken } = await this.tokenService.createTokens(result);
        return {
            user: {
                id: result.id,
                login: result.login,
                email: result.email,
            },
            accessToken,
            refreshToken,
        };
    }

    // 登录校验，JWT验证 - Step 2: 校验用户信息
    async validateUser(
        username: string,
        password: string
    ): Promise<UserInfo | null> {
        // 查询数据库，判断密码，密码正确的话，返回用户信息
        this.logger.log('auth service validateUser: ', username, password);

        const user = await this.userService.findByLogin(username);

        this.logger.debug('user: ', user);

        if (!user) {
            // return null;
            throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
        }
        const checked = this.passwordService.compare(password, user.pass);

        this.logger.debug('checked: ', checked);
        if (!checked) {
            // return null;
            throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
        }

        // 用户存在，密码正确。生成 token
        const { pass, id, roles, ...result } = user;
        const roleList = roles as string[];

        return { id, roles: roleList, ...result };
    }

    // JWT验证 - Step 3: 处理 jwt 签证
    async certificate(user: any) {
        console.log('certificate user: ', user);
        const payload = {
            username: user.userLogin,
            sub: user.ID,
            realName: user.userNicename,
            role: user.role,
        };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');
        try {
            const token = this.jwtService.sign(payload);
            return {
                code: 200,
                data: {
                    token,
                },
                msg: `登录成功`,
            };
        } catch (error) {
            return {
                code: 600,
                msg: `账号或密码错误`,
            };
        }
    }

    refreshToken(token: string) {
        try {
            const { id } = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            return this.tokenService.createTokens({
                id,
            });
        } catch (err) {
            throw new HttpException('refreshToken', HttpStatus.UNAUTHORIZED);
        }
    }

    // payload 是 token 等信息，根据 token 信息获取用户信息
    async validateAuthData(payload) {
        console.log('payload: ', payload);
        // todo: 数据库里判断是否有该用户，获取该用户详细信息
        const user = await this.userService.findById(payload.sub);

        if (!user) {
            throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
        }
        // 会自动生成完整用户信息
        const { pass, ...result } = user;
        return result;
        // return {
        //     id: payload.sub,
        //     login: payload.login,
        //     ...user,
        // };
    }

    // async validateUser2(token: string): Promise<any> {
    //     return this.userService.findOneByToken(token);
    // }

    // public async validate(payload: object): Promise<boolean> {
    //     // 給定 where 條件，依據 token payload 的 ID 作為 where 條件。
    //     const queryCondition = { where: { ID: payload['ID'] } };
    //     const user = await this.userService.findOne(queryCondition);
    //     // 有該筆資料，回傳 true
    //     if (user) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    get secret(): string {
        return this.configService.get('jwt.secret', '');
    }

    get refreshTtl(): number {
        return this.configService.get('jwt.refresh_ttl', 60) * 60 * 60;
    }

    get ttl(): number {
        return this.configService.get('jwt.ttl', 60) * 60 * 60;
    }

    jwtException(code: number, message: string): HttpException {
        return new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    /**
     * 获取加密 token
     *
     * @param {any} data token 的标识（默认为用户标识）
     *
     * @returns {string}
     */
    async create(data: any): Promise<string> {
        this.logger.debug(this.secret, this.ttl);
        this.logger.debug(data);

        const token = await this.jwtService.sign(
            { customClaims: data },
            {
                // expiresIn: this.ttl, // token 过期时间, 单位: 小时
            },
        );

        this.logger.debug('token: ', token);

        const refreshToken = this.jwtService.sign(data, {
            // expiresIn: this.ttl,
        });
        const redisScope = this.configService.get('jwt.redisScope');
        const redisTokenKey = `${redisScope}:accessToken:${data.id}`;
        await this.redisService.set(redisTokenKey, token, this.ttl);

        return token;
    }

    /**
     * 验证 token 是否有效
     *
     * @param token
     */
    async verify(token: string) {
        this.logger.debug(`varify ${token}`);

        // 获取解密成功的数据，验证失败直接抛出错误。
        const result = await this.jwtService.verify(token, {
            clockTolerance: 30, // 检查 nbf (token 最早可用时间) 和 exp (token 过期时间) 声明时容忍的秒数，以处理不同服务器之间的小时钟差异
        });

        // 判断该 token 是否已被拉黑
        if (await this.verifyBlack(token)) {
            this.jwtException(403, '无效 token');
        }

        this.logger.debug('result: ', result);
    }

    /**
     * 快速获取 payload 数据
     *
     * @param {string} $token JWT token
     */
    async getCustomClaims(token: string) {
        try {

            const jwtData: any = await this.verify(token);

            this.logger.debug('jwtData: ', jwtData);

            return jwtData.customClaims;
        } catch (err) {
            this.logger.error(err);
            // 过期错误
            if (typeof err === 'string') {
                const result = await this.refreshToken(token);
                this.logger.debug(`new token ${result}`);
                return result;
            }
        }

    }

    async blackToken(token: string) {
        // 解密 token
        const jwtData: any = await this.verify(token);

        const key = this.md5Service.generateMD5(token);

        const refreshTtl = jwtData.payload.iat + this.refreshTtl;

        const refreshTtlTime =
            refreshTtl - Math.floor(new Date().getTime() / 1000);

        // 判断 token 是否已失效 [ 非过期 ]，如果是已失效，那么就没拉黑的必要
        if (refreshTtlTime < 0) {
            return true;
        }

        // 储存到缓存黑名单中去
        return this.redisService.set(
            this.cachePrefix + key,
            '',
            refreshTtlTime,
        );
    }

    async verifyBlack(token) {
        // 使用 MD5 加密下，防止 key 过长
        const key = this.md5Service.generateMD5(token);
        // 返回获取该缓存
        return this.redisService.has(this.cachePrefix + key);
    }

    async authenticateWithGoogle(credential: string) {
        const clientID = this.configService.get<string>('google.clientID');
        const clientSecret = this.configService.get<string>('google.clientSecret');

        const OAuthClient = new OAuth2Client(clientID, clientSecret);
        const client = await OAuthClient.verifyIdToken({ idToken: credential });
        const userPayload = client.getPayload();

        if (!userPayload || !userPayload.email) {
            throw new Error('google account not found.');
        }

        // todo
        // 找到邮箱的账号，直接进行登录，需要保证注册的时候必须验证邮箱，且邮箱不能修改
        // 这种方法比较简陋，改成账号手动绑定的高级一些
        try {
            // 先从 account 中取出，判断有无绑定 user，
            // 没有的话，返回提示绑定，或者自动创建账号，
            // 有的话，取出 user
            const user = await this.userService.findByEmail(userPayload.email);

            return user;
        } catch (error: any) {
            if (error.status !== HttpStatus.NOT_FOUND) {
                throw new HttpException(error, HttpStatus.BAD_GATEWAY);
            }
        }
    }

    async removeUser(id: string) {
        return this.userService.removeById(id);
    }

    async forgotPassword(email: string) {
        return this.userVerificationService.generateResetKey(email);
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const user = await this.userService.findByResetToken(resetPasswordDto.resetToken);


        if (!user) {
            throw Error('链接已经失效，请重新申请。')
        }

        const password = this.passwordService.hash(resetPasswordDto.password);

        await this.userService.updateById(user.id, {
            password,
            resetToken: null
        });

        try {
            this.schedulerRegistry.deleteTimeout(`clear-resetToken-${user.id}`);

        } catch {
            //
        }
    }
}
