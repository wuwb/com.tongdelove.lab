import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../system/user/user.service";
import { UserInfo } from "../system/auth/interface/UserInfo";
import { AuthService } from "../system/auth/auth.service";
import * as svgCaptcha from 'svg-captcha';
import { CAPTCHA_IMAGE_KEY, USER_TOKEN_KEY, USER_VERSION_KEY } from '@/common/constants/redis.constant';
import { generateUUID } from '@/utils/base/string.util';
import { TokenService } from "../system/auth/token.service";
import { CacheService } from "@/core/cache/cache/cache.service";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "./dto/login.dto";
import { LoginResDto, UserInfoResDto } from "./dto/login-res.dto";
import { ApiException } from "@/common/exceptions/api.exception";
import { MenuService } from "../system/menu/menu.service";
import { Request } from 'express';
import { LogService } from "../monitor/log/log.service";
import { UpdatePasswordDto } from "../system/user/dto/update-password.dto";
import { JwtService } from "@/core/auth/jwt/jwt.service";
import { LoginLogService } from "../monitor/log/LoginLog.service";

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);

    captchaEnable;

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly cacheService: CacheService,
        private readonly configService: ConfigService,
        private readonly menuService: MenuService,
        private readonly jwtService: JwtService,
        private readonly logininService: LoginLogService,
    ) {
        this.captchaEnable = configService.get('captchaEnable', true);
    }

    /* 创建验证码图片 */
    async createImageCaptcha() {
        const { data, text } = svgCaptcha.createMathExpr({
            // size: 4, //验证码长度
            // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 3, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            // background: '#cc9966', // 验证码图片背景颜色
            width: 115.5,
            height: 38,
        });
        const result = {
            img: data.toString(),
            codeId: generateUUID(),
        };
        await this.cacheService.set(
            `${CAPTCHA_IMAGE_KEY}:${result.codeId}`,
            text,
            60 * 5, // 验证码 5 分钟过期
        );
        this.logger.debug(`验证码：${text}`)
        return result;
    }

    // jwt 登录，登录成功后，根据配置重新生成 token
    async login(request: Request, loginDto: LoginDto): Promise<LoginResDto> {

        // // 校验验证码
        // await this.validateCaptcha(loginDto);

        const { username, password } = loginDto;

        // 根据登录信息获取用户信息
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password
        );

        this.logger.log(`user: ${JSON.stringify(user)}`);

        // todo 判断是否需要绑定社交站好

        // 签发 token
        let accessToken = await this.tokenService.createAccessToken({
            id: user.id,
            username: username,
            password,
        });
        this.logger.log('accessToken: ', accessToken);
        if (await this.configService.get('isDemo')) {
            const token = await this.cacheService.get(`${USER_TOKEN_KEY}:${user.id}`);
            if (token) {
                accessToken = token;
            }
        }

        const result = {
            ...user,
            accessToken,
        };

        // 缓存数据，用来查看在线用户
        await this.cacheService.setUser(result);

        // 更新登录日志
        await this.logininService.addLoginInfo(request, '登录成功', `${USER_TOKEN_KEY}:${user.id}`)

        return result;
    }

    // 验证码开关，
    async validateCaptcha(loginDto) {
        // 如果验证码关闭，则不进行校验
        if (!this.captchaEnable) {
            return;
        }

        // 校验验证码
        const code = await this.cacheService.get(
            `${CAPTCHA_IMAGE_KEY}:${loginDto.codeId}`,
        );
        if (loginDto.code !== code) {
            throw new ApiException(10001, '登录验证码错误');
        }
    }

    async logout(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            if (await this.cacheService.get(`${USER_TOKEN_KEY}:${payload.userId}`)) {
                await this.cacheService.del(`${USER_TOKEN_KEY}:${payload.userId}`);
            }
        } catch (err) {

        }
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const user = await this.userService.findById(updatePasswordDto.id);

        if (!user) {
            throw new ApiException(10001, '未找到用户');
        }

        const updated = await this.userService.updatePassword(user.id, user.pass, updatePasswordDto.password);

        if (!updated) {
            throw new ApiException(10001, '密码更新失败');
        }

        // 避免用户重新登录
        // 生成新的 token

        // 更新 redis 中的 token

    }

    /* 获取用户信息 */
    async getUserInfo(userId: string): Promise<UserInfoResDto> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new ApiException(10003, '用户不存在');
        }

        const deptId = user.dept ? user.dept.id : '';
        const deptName = user.dept ? user.dept.name : '';
        const roleKeyArr: string[] = user.roles?.map((role) => role.key) ?? [];
        let permissions: string[] = [];

        if (!roleKeyArr.length) {
            permissions = [];
        } else {
            if (roleKeyArr.find((roleKey) => roleKey == 'admin')) {
                permissions = ['*:*:*'];
            } else {
                const roleIdArr = user.roles?.map((role) => role.id) ?? [];
                permissions = await this.menuService.getAllPermissionsByRoles(roleIdArr);
            }
        }

        return {
            permissions: [],
            roles: [],
            user,
        }
    }

    /* 获取当前用户的菜单 */
    async getRouterByUser(userId: string) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new ApiException(10003, '用户不存在');
        }
        const isAdmin = user.roles?.some((role) => role.key === 'admin') ?? false;
        const roleIdArr = user.roles?.map((role) => role.id) ?? [];

        if (!isAdmin && !roleIdArr.length) {
            return [];
        }

        return await this.menuService.getMenuList(isAdmin, roleIdArr);
    }
}
