import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { INVALID_PASSWORD_ERROR, INVALID_USERNAME_ERROR } from "./auth.constants";
import { ITokenService, ITokenPayload } from "./interface/ITokenService";
import { Md5Service } from "@/shared/helper/helper.service.md5";
import { CacheService } from "@/core/cache/cache/cache.service";
import { USER_TOKEN_KEY, USER_VERSION_KEY } from "@/common/constants/redis.constant";
import { ApiException } from "@/common/exceptions/api.exception";
import { JwtService } from "@/core/auth/jwt/jwt.service";

@Injectable()
export class TokenService implements ITokenService {
    private readonly logger = new Logger(TokenService.name);

    get refreshTtl(): number {
        return this.configService.get('jwt.refresh_ttl', 60) * 60 * 60;
    }

    get ttl(): number {
        return this.configService.get('jwt.ttl', 60) * 60 * 60;
    }

    // 储存到缓存的前缀
    private cachePrefix: string;


    constructor(
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService,
        protected readonly md5Service: Md5Service,
        protected readonly cacheService: CacheService,
    ) {
        this.cachePrefix = this.configService.get('jwt.cache_prefix', 'jwt:');
    }

    // 创建 token
    async createTokens(payload: Partial<User>) {
        return {
            accessToken: await this.createAccessToken(payload),
            refreshToken: await this.createRefreshToken(payload),
        };
    }

    // 创建 token
    async createAccessToken({ id, login, password }: Partial<User>, options?: JwtSignOptions): Promise<string> {
        if (!login) return Promise.reject(INVALID_USERNAME_ERROR);
        if (!password) return Promise.reject(INVALID_PASSWORD_ERROR);
        const token = await this.jwtService.signAsync({
            sub: id,
            login,
        }, options);

        const redisScope = this.configService.get('jwt.redisScope');
        const redisTokenKey = `${redisScope}:accessToken:${id}`;
        await this.cacheService.set(redisTokenKey, token, this.ttl);

        return token;
    }

    async createRefreshToken(payload: Partial<User>, options: any = {}) {
        const token = await this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.refresh_secret', 'printlake'),
            expiresIn: this.configService.get('jwt.expiresIn', '7d'),
        });

        return token;
    }

    async verifyToken(token: string) {
        // 获取解密成功的数据，验证失败直接抛出错误。
        const result = await this.jwtService.verify(token, {
            clockTolerance: 30, // 检查 nbf (token 最早可用时间) 和 exp (token 过期时间) 声明时容忍的秒数，以处理不同服务器之间的小时钟差异
        });

        return result;
    }

    // 验证 token 是否有效，是否过期，或者被重置
    async validateToken(userId: string, passwordVersion: number, token: string) {

        // 判断该 token 是否已被拉黑
        if (await this.validateBlockToken(token)) {
            return new HttpException('无效 token', HttpStatus.UNAUTHORIZED);
        }

        const cachedToken = await this.cacheService.get(`${USER_TOKEN_KEY}:${userId}`)

        if (token !== cachedToken) {
            throw new ApiException(1001, `Cached token`)
        }

        const cachedPasswordVersion = parseInt(
            await this.cacheService.get(`${USER_VERSION_KEY}:${userId}`)
        )

        if (passwordVersion !== cachedPasswordVersion) {
            throw new ApiException(10001, '用户信息已经被修改');
        }

        // 获取解密成功的数据，验证失败直接抛出错误。
        const result = await this.jwtService.verify(token, {
            clockTolerance: 30, // 检查 nbf (token 最早可用时间) 和 exp (token 过期时间) 声明时容忍的秒数，以处理不同服务器之间的小时钟差异
        });

        return result;
    }

    async blackToken(token: string) {

        const key = this.md5Service.generateMD5(token);
        const jwtData = this.jwtService.decode(token);

        if (!jwtData) {
            throw new ApiException(10001, 'token 无效');
        }
        // 解码 token
        if (typeof jwtData === 'string') {
            throw new ApiException(10001, 'token 无效');
        }
        const refreshTtl = jwtData.payload.iat + this.refreshTtl;

        const refreshTtlTime =
            refreshTtl - Math.floor(new Date().getTime() / 1000);

        // 判断 token 是否已失效 [ 非过期 ]，如果是已失效，那么就没拉黑的必要
        if (refreshTtlTime < 0) {
            return true;
        }

        // 储存到缓存黑名单中去
        return this.cacheService.set(
            this.cachePrefix + key,
            '',
            refreshTtlTime,
        );
    }

    async validateBlockToken(token) {
        // 使用 MD5 加密下，防止 key 过长
        const key = this.md5Service.generateMD5(token);
        // 返回获取该缓存
        return this.cacheService.has(this.cachePrefix + key);
    }
}
