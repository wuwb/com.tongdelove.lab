import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../system/user/user.service";
import { UserInfo } from "../system/auth/interface/UserInfo";
import { AuthService } from "../system/auth/auth.service";
import * as svgCaptcha from 'svg-captcha';
import { CAPTCHA_IMG_KEY } from '@/common/constants/redis.constant';
import { generateUUID } from '@/utils';
import { TokenService } from "../system/auth/token.service";
import { RedisService } from "@/core/cache/redis/redis.service";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "./dto/login.dto";
import { LoginResDto, UserInfoResDto } from "./dto/login-res.dto";
import { ApiException } from "@/common/exceptions/api.exception";
import { MenuService } from "../system/menu/menu.service";

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
        private readonly menuService: MenuService,
    ) {
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
            uuid: generateUUID(),
        };
        await this.redisService.set(
            `${CAPTCHA_IMG_KEY}:${result.uuid}`,
            text,
            // 'EX',
            60 * 5,
        );
        return result;
    }


    // jwt 登录，登录成功后，根据配置重新生成 token
    async login(loginDto: LoginDto): Promise<LoginResDto> {
        const { username, password } = loginDto;

        // 根据登录信息获取用户信息
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password
        );
        if (!user) {
            throw new UnauthorizedException("The passed loginDto are incorrect");
        }

        // 登录成功，

        // 更新登录日志

        // 签发 token
        const accessToken = await this.tokenService.createAccessToken({
            id: user.id,
            login: username,
            password,
        });

        // 储存 token

        const result = {
            ...user,
            accessToken,
        };

        // 缓存数据，用来查看在线用户
        this.redisService.setUser(result);

        return result;
    }

    async logout(token: string) {
        try {
            const payload = this.tokenService.verifyToken(token);
        } catch (err) {

        }
    }

    /* 获取用户信息 */
    async getUserInfo(userId: string): Promise<UserInfoResDto> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new ApiException(10003, '用户不存在');
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
