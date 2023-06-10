import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ALIYUN_CLOUD_STORAGE } from '@/config/admin.config';
import { ConfigService } from '@nestjs/config';

const STS = (OSS as any).STS;

export interface IUpToken {
    AccessKeyId: string;
    AccessKeySecret: string;
    SecurityToken: string;
    Expiration: string;
}

@Injectable()
export class AliossService {
    private sts: typeof STS;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.sts = new STS({
            accessKeyId: ALIYUN_CLOUD_STORAGE.accessKey,
            accessKeySecret: ALIYUN_CLOUD_STORAGE.secretKey,
        });
    }

    private createClient() {
        const client = new OSS({
            region: this.configService.get('alioss.region'),
            accessKeyId: this.configService.get('alioss.accessKeyID'),
            accessKeySecret: this.configService.get('alioss.accessKeySecret'),
            bucket: this.configService.get('alioss.bucket'),
        });
        return client;
    }

    // 获取临时 Token
    public async getToken(): Promise<IUpToken> {
        const response = await this.sts.assumeRole(
            ALIYUN_CLOUD_STORAGE.aliyunAcsARN,
            null,
            15 * 60,
            'session-name'
        );
        return response.credentials;
    }

    // 上传文件
    public async uploadFile(name: string, file: any, region: string, bucket: string) {
        return this.getToken().then((token) => {
            let client = new OSS({
                region,
                bucket,
                accessKeyId: token.AccessKeyId,
                accessKeySecret: token.AccessKeySecret,
                stsToken: token.SecurityToken,
                secure: true,
            });
            return client.put(name, file).finally(() => {
                client = null
            });
        });
    }
}
