import { Injectable, Module } from "@nestjs/common";
import { TypeormService } from "./typeorm.service";
import { TypeOrmModule as BaseTypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@/config/config.service";

@Module({
    imports: [
        /* 连接mysql数据库 */
        BaseTypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    autoLoadEntities: true,
                    type: configService.get<any>('database.type'),
                    host: configService.get<string>('database.host'),
                    port: configService.get<number>('database.port'),
                    username: configService.get<string>('database.username'),
                    password: configService.get<string>('database.password'),
                    database: configService.get<string>('database.database'),
                    autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
                    synchronize: configService.get<boolean>('database.synchronize'),
                    logging: configService.get('database.logging'),
                };
                // typeorm bug, https://github.com/nestjs/nest/issues/1119
                // 将 type 定义为 type: 'mysql' | 'mariadb'; 解决此issue
                // return configService.db;
            },
            inject: [ConfigService],
        }),
    ],
    providers: [
        TypeormService,
    ],
    exports: [
        TypeormService,
    ],
})
export class TypeormModule {

}
