/* eslint-disable import/no-unresolved */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { INVALID_PASSWORD_ERROR, INVALID_USERNAME_ERROR } from "./auth.constants";
import { ITokenService, ITokenPayload } from "./interface/ITokenService";
import { Md5Service } from "@/utils/helper/helper.service.md5";
import { RedisService } from "@/core/cache/redis/redis.service";

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
        protected readonly redisService: RedisService,
    ) {
        this.cachePrefix = this.configService.get('jwt.cache_prefix', 'jwt:');
    }

    async createTokens(payload: Partial<User>) {
        return {
            accessToken: await this.createAccessToken(payload),
            refreshToken: await this.createRefreshToken(payload),
        };
    }

    /**
     * 创建 token
     * @object { id: String, username: String, password: String} token 的标识（默认为用户标识）
     * @returns a jwt token sign with the username and user id
     */
    async createAccessToken({ id, login, password }: Partial<User>, options?: JwtSignOptions): Promise<string> {
        if (!login) return Promise.reject(INVALID_USERNAME_ERROR);
        if (!password) return Promise.reject(INVALID_PASSWORD_ERROR);
        const token = await this.jwtService.signAsync({
            sub: id,
            login,
        }, options);

        const redisScope = this.configService.get('jwt.redisScope');
        const redisTokenKey = `${redisScope}:accessToken:${id}`;
        await this.redisService.set(redisTokenKey, token, this.ttl);

        return token;
    }

    async createRefreshToken(payload: Partial<User>, options: any = {}) {
        const token = await this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.refresh_secret', 'printlake'),
            expiresIn: this.configService.get('jwt.expiresIn', '7d'),
        });

        return token;
    }

    async verifyBlack(token) {
        // 使用 MD5 加密下，防止 key 过长
        const key = this.md5Service.generateMD5(token);
        // 返回获取该缓存
        return this.redisService.has(this.cachePrefix + key);
    }

    jwtException(code: number, message: string): HttpException {
        return new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    /**
     * 验证 token 是否有效
     *
     * @param token
     */
    async verifyToken(token: string) {
        this.logger.debug(`varify ${token}`);

        // 判断该 token 是否已被拉黑
        if (await this.verifyBlack(token)) {
            this.jwtException(403, '无效 token');
        }

        // 获取解密成功的数据，验证失败直接抛出错误。
        const result = await this.jwtService.verify(token, {
            clockTolerance: 30, // 检查 nbf (token 最早可用时间) 和 exp (token 过期时间) 声明时容忍的秒数，以处理不同服务器之间的小时钟差异
        });

        return result;

    }

    async blackToken(token: string) {
        // 解密 token
        const jwtData: any = await this.verifyToken(token);

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
}
