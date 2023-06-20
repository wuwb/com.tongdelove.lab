import { DynamicModule, Global, Module, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigModule as BaseConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

import { validate } from '@/config/env.validation';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import googleConfig from './config/google.config';
import mailConfig from './config/mail.config';
import storageConfig from './config/storage.config';
import swaggerConfig from "./config/swagger.config";
import jwtConfig from "./config/jwt.config";
import serverConfig from "./config/server.config";
import githubConfig from "./config/github.config";
import configuration from "./configuration";
// import graphqlConfig from "./config/graphql.config";

const validationSchema = Joi.object({
    // App
    TZ: Joi.string().default('UTC'),
    PORT: Joi.number().default(3100),
    // SECRET_KEY: Joi.string().required(),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),

    // URLs
    // PUBLIC_URL: Joi.string().default('http://localhost:3000'),

    // Database
    // POSTGRES_HOST: Joi.string().required(),
    // POSTGRES_PORT: Joi.number().default(5432),
    // POSTGRES_DB: Joi.string().required(),
    // POSTGRES_USER: Joi.string().required(),
    // POSTGRES_PASSWORD: Joi.string().required(),
    // POSTGRES_SSL_CERT: Joi.string().allow(''),

    // Google
    // GOOGLE_API_KEY: Joi.string().allow(''),
    // GOOGLE_CLIENT_SECRET: Joi.string().allow(''),
    // PUBLIC_GOOGLE_CLIENT_ID: Joi.string().allow(''),

    // Mail
    // MAIL_FROM_NAME: Joi.string().allow(''),
    // MAIL_FROM_EMAIL: Joi.string().allow(''),
    // MAIL_HOST: Joi.string().allow(''),
    // MAIL_PORT: Joi.string().allow(''),
    // MAIL_USERNAME: Joi.string().allow(''),
    // MAIL_PASSWORD: Joi.string().allow(''),

    // Storage
    // STORAGE_BUCKET: Joi.string().allow(''),
    // STORAGE_REGION: Joi.string().allow(''),
    // STORAGE_ENDPOINT: Joi.string().allow(''),
    // STORAGE_URL_PREFIX: Joi.string().allow(''),
    // STORAGE_ACCESS_KEY: Joi.string().allow(''),
    // STORAGE_SECRET_KEY: Joi.string().allow(''),
});

// 应用初始化的时候对配置模块进行初始化
@Global()
@Module({
    imports: [
        BaseConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
            load: [
                configuration, // 默认配置

                // config/*
                appConfig,
                databaseConfig,
                githubConfig,
                // graphqlConfig,
                jwtConfig,
                serverConfig,
                swaggerConfig,
                databaseConfig,
                googleConfig,
                mailConfig,
                storageConfig
            ],
            ignoreEnvFile: false,
            cache: true,
            expandVariables: true, // 支持嵌套
            validate,
            validationSchema: validationSchema,
        }),
    ],
    providers: [
        ConfigService,
    ],
    exports: [
        ConfigService,
    ]
})
export class ConfigModule extends BaseConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {

    async onApplicationBootstrap() {
    }

    async onApplicationShutdown(signal?: string) {
    }
}
