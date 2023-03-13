import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ALIYUN_CLOUD_STORAGE } from '@/config/admin.config';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
// import { SignedURLResponse } from './upload.model';

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

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
        const uploadResult = await s3
            .upload({
                Bucket: this.configService.get('BUCKET_NAME') || '',
                Body: dataBuffer,
                Key: filename,
            })
            .promise();
        return uploadResult;
    }

    async getPreSignedURL(filename: string): Promise<any> {
        const s3 = new S3();
        const expiry = this.configService.get('SIGNED_URL_TIMEOUT')
            ? this.configService.get('SIGNED_URL_TIMEOUT')
            : 72000;
        const presignedPUTURL = s3.getSignedUrl('putObject', {
            Bucket: this.configService.get('BUCKET_NAME'),
            Key: filename,
            Expires: expiry,
        });

        return {
            url: presignedPUTURL,
            durationToExpire: expiry,
        };
    }
}
