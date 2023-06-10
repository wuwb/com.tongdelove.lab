import { Injectable, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/system/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import { MailService } from '@/core/mail/mail/mail.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserVerificationService } from '@/modules/system/user/user-verification.service';
import { UserInfo } from './interface/UserInfo';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { isEmail, isMobilePhone } from 'class-validator';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly userVerificationService: UserVerificationService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
    ) {
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
                    username: username,
                    gender: 0,
                    birthday: '',
                    last_login_time: '',
                    last_login_ip: '',
                    level: 0,
                    weixin_openid: '',
                    session_key: '',
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

        // todo, 判断登录名类型，调用不同的查询用户方法
        let user;

        if (isMobilePhone(username, 'zh-CN')) {
            user = await this.userService.findByMobilePhone(username);
        }
        else if (isEmail(username)) {
            user = await this.userService.findByEmail(username);
        } else {
            user = await this.userService.findByLogin(username);
        }

        this.logger.debug('user: ', user);

        if (!user) {
            // return null;
            // throw new NotFoundException('用户不存在');
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
            return this.tokenService.createRefreshToken({
                id,
            });
        } catch (err) {
            throw new HttpException('refreshToken', HttpStatus.UNAUTHORIZED);
        }
    }

    // payload 是 token 等信息，根据 token 信息获取用户信息
    async validateAuthData(payload): Promise<any> {
        console.log('payload: ', payload);
        // todo: 数据库里判断是否有该用户，获取该用户详细信息
        const user = await this.userService.findById(payload.sub);

        if (!user) {
            throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
        }
        // 会自动生成完整用户信息
        const { pass, password, ...result } = user;
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

    /**
     * 快速获取 payload 数据
     *
     * @param {string} $token JWT token
     */
    async getCustomClaims(token: string) {
        try {
            const jwtData: any = await this.tokenService.verifyToken(token);

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
