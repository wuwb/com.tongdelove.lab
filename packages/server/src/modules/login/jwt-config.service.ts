import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
// import { ConfigService } from "../config.service";

export class JwtConfigService implements JwtOptionsFactory {
    constructor(
        // private readonly configService: ConfigService,
    ) {

    }

    createJwtOptions(): JwtModuleOptions {
        //     const secret = this.configService.get('jwt.secret');
        //     const expiresIn = this.configService.get('jwt.expiresIn');

        //     console.log('secret: ', secret);
        //     console.log('expiresIn: ', expiresIn);

        //     if (!secret) {
        //         throw new Error("Didn't get a valid jwt secret");
        //     }
        //     if (!expiresIn) {
        //         throw new Error("Jwt expire in value is not valid");
        //     }

        return {
            global: false,
            secret: 'sdfsadfsadjglg',
            signOptions: {
                expiresIn: '8h', // '8h', default 60s
            }
        };
    }
}
