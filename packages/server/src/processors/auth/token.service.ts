/* eslint-disable import/no-unresolved */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { INVALID_PASSWORD_ERROR, INVALID_USERNAME_ERROR } from "./auth.constants";
import { ITokenService, ITokenPayload } from "./interface/ITokenService";

@Injectable()
export class TokenService implements ITokenService {
    constructor(
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService,
    ) { }

    createTokens(payload: Partial<User>) {
        return {
            accessToken: this.createAccessToken(payload),
            refreshToken: this.createRefreshToken(payload),
        };
    }

    /**
     *
     * @object { id: String, username: String, password: String}
     * @returns a jwt token sign with the username and user id
     */
    createAccessToken({ id, login, password }: Partial<User>, options?: JwtSignOptions): Promise<string> {
        if (!login) return Promise.reject(INVALID_USERNAME_ERROR);
        if (!password) return Promise.reject(INVALID_PASSWORD_ERROR);
        return this.jwtService.signAsync({
            sub: id,
            login,
        }, options);
    }

    createRefreshToken(payload: Partial<User>, options: any = {}) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.refresh_secret', 'printlake'),
            expiresIn: this.configService.get('jwt.expiresIn', '7d'),
        });
    }
}
