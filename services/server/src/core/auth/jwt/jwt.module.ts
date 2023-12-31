import { Module } from "@nestjs/common";
import { JwtModule as BaseJwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./jwt-config.service";
import { JwtService } from "./jwt.service";

@Module({
    imports: [
        BaseJwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
    providers: [
        JwtService,
    ],
    exports: [
        JwtService,
    ]
})
export class JwtModule {

}
