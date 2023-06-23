import { google } from 'googleapis';
import { Credentials, JWT } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { getMessageFromNormalError } from '@/common/transformers/error.transformer';
import logger from '@/utils/logger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
    private jwtClient: JWT | null = null;

    constructor(
        private readonly configService: ConfigService,

    ) {
        this.initClient();
    }

    private initClient() {
        try {
            const serverAccountFilePath = this.configService.get('GOOGLE.serverAccountFilePath');
            const key = require(serverAccountFilePath);
            this.jwtClient = new google.auth.JWT(
                key.client_email,
                undefined,
                key.private_key,
                [
                    'https://www.googleapis.com/auth/indexing', // ping 服务
                    'https://www.googleapis.com/auth/analytics.readonly', // GA 服务
                ],
                undefined,
            );
        } catch (error) {
            logger.warn('[GoogleAPI]', '服务初始化时读取配置文件失败！');
        }
    }

    // 获取证书
    public getCredentials(): Promise<Credentials> {
        return new Promise((resolve, reject) => {
            if (!this.jwtClient) {
                return reject('[GoogleAPI] 未成功初始化，无法获取证书！');
            }
            this.jwtClient.authorize((error, credentials) => {
                if (!credentials) {
                    return;
                }
                const message = getMessageFromNormalError(error);
                if (message) {
                    logger.warn('[GoogleAPI]', '获取证书失败：', message);
                    reject(message);
                }
                resolve(credentials);
            });
        });
    }
}
